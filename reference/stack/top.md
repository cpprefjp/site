#top
```cpp
reference top();

const_reference top() const;
```

##概要

<b>stack の次の要素への参照を返す。</b>
<b>これは一番最後に stack に挿入された要素で、pop() メンバ関数で削除される要素である。</b><b>内部のコンテナの back() メンバ関数を呼ぶ。</b>



##戻り値

stack の最後の要素への参照。



##計算量




##例

```cpp
#include <iostream>

#include <stack>
```

int  main ()

{

  std::stack<int> st;


  // 要素の追加

  st.push(1);

  st.push(2);

  st.push(3);

  // 末尾要素を表示
  std::cout << st.<color=ff0000>top</color>();

}




###出力

```cpp
3
```

##実装例

```cpp
reference top() { return c.back(); }

const_reference top() const { return c.back(); }
```

##参照

| | |
|---------------------------------------------------------------------------------|--------------------------------------------|
| <br/>[push](/reference/stack/push.md) | <br/>要素の追加 (publicメンバ関数)  |
| <br/>[pop](/reference/stack/pop.md) | <br/>要素の削除 (publicメンバ関数)  |




