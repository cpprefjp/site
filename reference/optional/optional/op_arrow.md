# operator->
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
// optional<T>版のオーバーロード
constexpr const T* operator->() const; // (1) C++17
constexpr T* operator->();             // (2) C++17

// optional<T&>版のオーバーロード (C++26)
constexpr T* operator->() const noexcept; // (3) C++26
```

## 概要
保持している有効値のメンバにアクセスする。

- (1) : `optional<T>`のconst版。`const T*`を返す
- (2) : `optional<T>`の非const版。`T*`を返す
- (3) : `optional<T&>`の場合。`T*`を返す

`optional<T>`では (1), (2) が定義され、`optional<T&>`では (3) のみが定義される。


## 堅牢化された事前条件
`*this`が有効な値を保持していること


## 戻り値
- (1) : 有効値への`const T*`
- (2) : 有効値への`T*`
- (3) : 参照先への`T*`


## 例外
投げない


## 備考
`optional`クラスはスマートポインタとしても見なせるため、この演算子のようなポインタのインタフェースを持つ。非ポインタインタフェースである[`value()`](value.md)の使用も検討するとよい。


## 例
```cpp example
#include <iostream>
#include <optional>
#include <string>

int main()
{
  std::optional<std::string> p = "Hello";
  if (p) {
    std::size_t size = p->size(); // 有効値のメンバ関数を呼び出す
    std::cout << size << std::endl;
  }
}
```
* p->[color ff0000]
* size()[link /reference/string/basic_string/size.md]

### 出力
```
5
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`optional::value()`](value.md)


## 参照
- [LWG Issue 2740. `constexpr optional<T>::operator->`](https://wg21.cmeerw.net/lwg/issue2740)
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
- [P2988R12 `std::optional<T&>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2988r12.pdf)
    - C++26で参照型`T&`に対する部分特殊化を追加
