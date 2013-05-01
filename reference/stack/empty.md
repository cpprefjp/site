#empty

```cpp
bool empty() const;
```

##<b>概要</b>

<b>stack が空か否か、つまり要素数が 0 か否かを返す。</b>
<b>内部のコンテナの empty() メンバ関数を呼ぶ。</b>




##<b>戻り値</b>

要素数が 0 の場合は true 、それ以外の場合は false 。



##<b>計算量</b>

定数時間 O(1)。



##<b>例</b>


```cpp
#include <iostream>

#include <stack>
```

int  main ()

{
  std::stack<int>  st;

  // 空なら "empty", そうでなければ "not empty" と表示する
  if (st.<color=ff0000>empty</color>()) {
    std::cout << "empty" << std::endl;
  } else {
    std::cout << "not empty" << std::endl;
  }

  // 要素を追加
  st.push(1);

  // 空なら "empty", そうでなければ "not empty" と表示する
  if (st.<color=ff0000>empty</color>()) {
    std::cout << "empty" << std::endl;
  } else {
    std::cout << "not empty" << std::endl;
  }

}




##<b>出力</b>


```cpp
empty

not empty
```

##実装例

```cpp
bool empty() const { return c.empty(); }
```

##参照

| | |
|---------------------------------------------------------------------------------|-----------------------------------------------|
| <br/>[size](/reference/stack/size.md) | <br/>要素数を返す (publicメンバ関数)  |

