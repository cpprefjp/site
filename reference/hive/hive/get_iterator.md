# get_iterator
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
iterator get_iterator(const_pointer p) noexcept;             // (1) C++26
const_iterator get_iterator(const_pointer p) const noexcept; // (2) C++26
```

## 概要
`*this`の要素を指すポインタ`p`から、その要素を指すイテレータを取得する。

`hive`は要素のポインタ・参照が安定しているため、要素のポインタを保持しておき、後からそのポインタを指すイテレータを復元する用途で使用できる。


## 事前条件
`p`が`*this`の要素を指していること。


## 戻り値
`p`と同じ要素を指す`iterator`または`const_iterator`。


## 計算量
`*this`のアクティブブロック数に対して線形時間


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h = {1, 2, 3};

  // 要素のポインタを保持しておく
  const int* p = &*h.begin();

  // ポインタからイテレータを復元する
  std::hive<int>::iterator it = h.get_iterator(p);

  std::println("{}", *it);

  // 復元したイテレータで要素を削除する
  h.erase(it);
  std::println("size = {}", h.size());
}
```
* get_iterator[color ff0000]
* h.begin()[link begin.md]
* h.erase[link erase.md]
* h.size()[link size.md]

### 出力
```
1
size = 2
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive::begin`](begin.md)
- [`hive::erase`](erase.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
