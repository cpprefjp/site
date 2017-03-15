# size
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]

```cpp
size_type size() const;
```

## 概要
`stack` に格納されている要素の個数を返す。

内部のコンテナの `size()` メンバ関数を呼ぶ。


## 効果
```cpp
return c.size();
```


## 戻り値
`stack` の内部のコンテナに含まれている要素の個数。


## 例
```cpp
#include <iostream>
#include <stack>

int main()
{
  std::stack<int> st;

  // 要素を 1 個追加
  st.push(3);

  // 要素数を表示
  std::cout << st.size() << std::endl;

  // 要素を 5 個追加
  st.push(1);
  st.push(4);
  st.push(1);
  st.push(5);
  st.push(9);

  // 要素数を表示
  std::cout << st.size() << std::endl;
}
```
* size()[color ff0000]
* st.push[link push.md]

### 出力
```
1
6
```

## 実装例
```cpp
size_type size() const { return c.size(); }
```

## 関連項目

| 名前 | 説明 |
|-----------------------|--------------------------------|
| [`empty`](empty.md) | コンテナが空であるかを確認する |

