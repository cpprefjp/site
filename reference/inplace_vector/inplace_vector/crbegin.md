# crbegin
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr const_reverse_iterator crbegin() const noexcept; // (1) C++26
```

## 概要
末尾を指す読み取り専用逆イテレータを取得する。


## 戻り値
`const_reverse_iterator`型で末尾を指す逆イテレータを返す。


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

  decltype(iv)::const_reverse_iterator i = iv.crbegin();
  std::println("{}", *i);
}
```
* crbegin()[color ff0000]

### 出力
```
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
