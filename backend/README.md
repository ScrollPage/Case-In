This is a [Django](https://docs.djangoproject.com/en/3.1/)

## Getting Started

To launch this project you need:
- Install Python 3.8+
- Install a virtaualenv package
- Install a Docker daemon

If you want to run development server:

```bash
pytohn -m venv env
pip install -r req.txt
python manage.py runserver
```

If you want to run prod server:

```bash
docker-compose build
docker-compose up
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Django and DRF, take a look at the following resources:

- [Next.js Documentation](https://www.django-rest-framework.org/) - learn about DRF features.
- [Learn Next.js](https://docs.djangoproject.com/en/3.1/intro/) -  Django tutorial.

You can check out [the DRF GitHub repository](https://github.com/encode/django-rest-framework) - your feedback and contributions are welcome!

## Deploy on VPS

- Connect to a VPS via ssh or by password
- Run foolowing commands
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt install git
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose build
docker-compose up
```
You are ready to go!