/**
 * API Service – points to the Django backend
 */

export const API_CONFIG = {
  BASE_URL:
    process.env.EXPO_PUBLIC_API_URL ||
    "https://attendpay-backend.onrender.com/api",
  TIMEOUT: 15000,
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login/",
    REGISTER: "/auth/register/",
    LOGOUT: "/auth/logout/",
  },
  PROFILE: "/profile/",
  DASHBOARD: "/dashboard/",
  ATTENDANCE: {
    CLOCK_IN: "/attendance/clock-in/",
    CLOCK_OUT: "/attendance/clock-out/",
    HISTORY: "/attendance/history/",
  },
  QR: {
    ARRIVAL: "/qr/arrival/",
    DEPARTURE: "/qr/departure/",
    REGISTRATION: "/qr/registration/",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard/",
    EMPLOYEES: "/admin/employees/",
    ATTENDANCE: "/admin/attendance/",
    SALARIES: "/admin/salaries/",
    SALARY_OVERVIEW: "/admin/salary-overview/",
    PAYROLL: "/admin/payroll/",
  },
  PAYROLL: "/payroll/",
};

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
}

class APIClient {
  private baseUrl: string = API_CONFIG.BASE_URL;
  private authToken: string | null = null;

  setAuthToken(token: string | null) {
    this.authToken = token;
  }
  getAuthToken(): string | null {
    return this.authToken;
  }
  clearAuthToken() {
    this.authToken = null;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
      };
      if (this.authToken) {
        headers["Authorization"] = `Token ${this.authToken}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        API_CONFIG.TIMEOUT,
      );

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Django returns errors as { detail: '...' } or { error: '...' } or field errors
        const firstError = Array.isArray(data)
          ? data[0]
          : typeof data === "object" && data !== null
            ? Object.values(data as Record<string, any>)[0]
            : undefined;
        const msg =
          data?.detail ||
          data?.error ||
          data?.non_field_errors?.[0] ||
          (Array.isArray(firstError) ? firstError[0] : firstError) ||
          `HTTP ${response.status}`;

        if (response.status === 503 || response.status === 502) {
          return {
            success: false,
            error: "Backend is starting up. Please wait 30 seconds.",
          };
        }

        return { success: false, error: String(msg) };
      }

      return { success: true, data };
    } catch (err: any) {
      if (err?.name === "AbortError") {
        return {
          success: false,
          error: "Request timed out. Check your connection.",
        };
      }
      return { success: false, error: err?.message || "Network error" };
    }
  }

  get<T = any>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
  }
  post<T = any>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
  put<T = any>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
  patch<T = any>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
  delete<T = any>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new APIClient();
export default apiClient;
