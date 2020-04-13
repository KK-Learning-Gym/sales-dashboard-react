import React from 'react'

const styles={
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'height': '90%',
    'color': 'white',
}

const Failed = () => {
    return (
        <div style={styles}>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div><br />
          <p>
          The backend hosted on Heroku is not responding.
          <br />
          You could try refreshing the page.
          <br /><br />
          If it still doesn't load then I've crossed my Heroku usage limit.
          <br /><br />
          But...
          <br /><br />
          You can check out the code for this repository here :<br /><br />
                <a href="">Frontend</a>
          &nbsp;&nbsp;&nbsp;
          <a href="">Backend</a>
          </p>
        </div>
    )
}

export default Failed