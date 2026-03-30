# cend
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr const_iterator cend() const noexcept; // (1) C++26
```

## 概要
末尾の次を指す読み取り専用イテレータを取得する。


## 戻り値
`const_iterator`型で末尾の次を指すイテレータを返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv = {1, 2, 3};

  for (auto i = iv.cbegin(); i != iv.cend(); ++i) {
    std::println("{}", *i);
  }
}
```
* cend()[color ff0000]
* iv.cbegin()[link cbegin.md]

### 出力
```
1
2
3
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]

## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
