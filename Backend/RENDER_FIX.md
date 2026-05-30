# Fix Render 500 errors

The login **500** was caused by the database layer failing on every query (wrong SSL settings for Render Postgres). Code fixes are in `Attendpay/settings.py`.

## Redeploy on Render

1. **Push** this repo to GitHub (or connect your repo to Render).

2. In the [Render Dashboard](https://dashboard.render.com/) → your **attendpay-backend** service:

   | Setting            | Value                                                                          |
   | ------------------ | ------------------------------------------------------------------------------ |
   | **Root Directory** | `Backend`                                                                      |
   | **Build Command**  | `pip install -r requirements.txt && python manage.py collectstatic --no-input` |
   | **Start Command**  | `python manage.py migrate --no-input && gunicorn Attendpay.wsgi:application`   |

3. **Environment variables** (required):

   | Key              | Value                                              |
   | ---------------- | -------------------------------------------------- |
   | `DATABASE_URL`   | From Render PostgreSQL → **Internal Database URL** |
   | `PYTHON_VERSION` | `3.10.0`                                           |
   | `SECRET_KEY`     | Long random string                                 |
   | `DEBUG`          | `false`                                            |

4. **PostgreSQL**: Create a Render Postgres instance and link `DATABASE_URL` to the web service (Environment → Link database).

5. **Manual Deploy** → Deploy latest commit.

## Verify after deploy

```powershell
# Should return JSON with status ok and employees >= 1
Invoke-RestMethod "https://attendpay-backend.onrender.com/api/health/"

# Should return token (not 500)
Invoke-RestMethod -Uri "https://attendpay-backend.onrender.com/api/auth/login/" `
  -Method POST -ContentType "application/json" `
  -Body '{"employee_id":"ADM001","password":"adm001"}'
```

Default credentials: **ADM001 / adm001**

## If health still fails

Open `https://attendpay-backend.onrender.com/api/health/?debug=1` to see the DB error message, then check:

- `DATABASE_URL` is set and correct
- Postgres instance is running (free tier sleeps; first request may take ~50s)
- Migrations ran (check deploy logs for `migrate`)
- Ensure `dj-database-url` is used in `settings.py` to parse the connection string.

### Required code for Attendpay/settings.py

Ensure your `DATABASES` setting looks exactly like this to support Render's PostgreSQL:

```python
import dj_database_url
import os

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600
    )
}
```
