# back
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
reference back();           // (1) C++98
constexpr reference back(); // (1) C++26

const_reference back() const;           // (2) C++98
constexpr const_reference back() const; // (2) C++26
```

## 概要
末尾要素への参照を取得する


## 戻り値
末尾の要素への参照を返す。

`a.back()` は `{ auto tmp = a.end(); --tmp; return *tmp; }` と同じ結果になる。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {3, 1, 4};

  int& x = ls.back();
  std::cout << x << std::endl;
}
```
* back()[color ff0000]

### 出力
```
4
```


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
- [LWG Issue 1039. Sequence container `back` function should also support `const_iterator`](https://cplusplus.github.io/LWG/issue1039)
    - C++11で、要件表における`back()`の説明が`iterator`を使うものから`auto`を使うものへ改められた。`const`なコンテナでは`end()`が`const_iterator`を返すため、`iterator`と書くと`const`版の説明として成立しなかった
