
exports.up = function(knex, Promise) {
    return knex.schema.createTable('customers', table => {
        table.increments('id').primary(); // adds an auto incrementing PK column
        table.string('customer').notNullable();
      }).then(() => {
            return knex.schema.createTable('users', table => {
                table.increments('id').primary(); // adds an auto incrementing PK column
                table.string('name').notNullable();
                table.string('email').notNullable();
                table.string('password').notNullable();
        })
        }).then(() => {
            return knex.schema.createTable('launchschedule', table => {
                table.increments('id').primary(); // adds an auto incrementing PK column
                table.integer('customer_id').notNullable().references('id').inTable('customers').onDelete('CASCADE');
                table.string('vehicle').notNullable();
                table.string('payload').notNullable();
                table.string('date').notNullable();
                table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
                table.boolean('commanderApproval').defaultTo('false');
            })
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('customers')
    .dropTableIfExists('users')
    .dropTableIfExists('launchschedule')
};

// module.exports.up = function(knex, Promise) {
//     // Create referenced table before referencing table.
//     return knex.schema
//     .createTable('first', function(first) {
//       first.increments('id').primary();
//     })
//     .createTable('second', function(second) {
//       second.increments('id').primary();
//       second.integer('first_id').references('id').inTable('first').notNull().onDelete('cascade');
//     });
//   };
  
//   module.exports.down = function(knex, Promise) {
//     // Reverse order here to prevent error.
//     return knex.schema
//     .dropTable('second')
//     .dropTable('first');
//   }