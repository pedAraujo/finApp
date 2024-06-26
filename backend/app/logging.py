import logging
import sys

# get logger
logger = logging.getLogger()

# create a formatter
formatter = logging.Formatter(fmt="%(asctime)s - %(levelname)s - %(message)s")

# create handlers
stream_handler = logging.StreamHandler(sys.stdout)
file_handler = logging.FileHandler("app.log")

# set formatters
stream_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

# add handlers to logger
logger.handlers = [stream_handler, file_handler]

# set log level
logger.setLevel(logging.INFO)

# disable passlib warning log
# AttributeError: module 'bcrypt' has no attribute '__about__'
logging.getLogger("passlib").setLevel(logging.ERROR)
