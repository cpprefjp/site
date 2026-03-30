# rend
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr reverse_iterator rend() noexcept;             // (1) C++26
constexpr const_reverse_iterator rend() const noexcept; // (2) C++26
```

## 概要
先頭の前を指す逆イテレータを取得する。

- (1) : 非`const`な文脈で先頭の前を指す逆イテレータを取得する。
- (2) : `const`な文脈で先頭の前を指す読み取り専用逆イテレータを取得する。


## 戻り値
非`const`な文脈では`reverse_iterator`型で先頭の前を指す逆イテレータを返し、
`const`な文脈では`const_reverse_iterator`型で先頭の前を指す逆イテレータを返す。


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

  for (auto i = iv.rbegin(); i != iv.rend(); ++i) {
    std::println("{}", *i);
  }
}
```
* rend()[color ff0000]
* iv.rbegin()[link rbegin.md]

### 出力
```
3
2
1
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
