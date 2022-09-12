"""empty message

Revision ID: 002a66e564b4
Revises: d281c2fbf9f6
Create Date: 2022-09-10 00:39:24.512566

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '002a66e564b4'
down_revision = 'd281c2fbf9f6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('personal', sa.Column('password', sa.String(length=256), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('personal', 'password')
    # ### end Alembic commands ###