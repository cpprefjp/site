#top
* stack[meta header]
* std[meta namespace]

```cpp
reference top();
const_reference top() const;
```

##概要
`stack` の次の要素への参照を返す。
これは一番最後に `stack` に挿入された要素で、`pop()` メンバ関数で削除される要素である。内部のコンテナの `back()` メンバ関数を呼ぶ。


##戻り値
`stack` の最後の要素への参照。


##例

```cpp
#include <iostream>
#include <stack>

int  main ()
{
  std::stack<int> st;

  // 要素の追加
  st.push(1);
  st.push(2);
  st.push(3);

  // 末尾要素を表示
  std::cout << st.top();
}
```
* swap[color ff0000]


###出力
```
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
| [`push`](./push.md) | 要素の追加 |
| [`pop`](./pop.md) | 要素の削除  |


