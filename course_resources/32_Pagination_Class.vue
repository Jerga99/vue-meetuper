.paginationContainer {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;

    > li {
      display: inline;
      font-size: 18px;

      > a {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #00d1b2;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
      }

      &.active {
        > a {
          z-index: 2;
          color: #fff;
          cursor: default;
          background-color: #00d1b2;
          border-color: #00d1b2;
        }
      }

      &.disabled {
        > a {
          color: #777;
          cursor: not-allowed;
          background-color: #fff;
          border-color: #ddd;
        }
      }
    }
 }
