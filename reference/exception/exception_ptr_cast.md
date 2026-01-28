# exception_ptr_cast
* exception[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class E>
  constexpr const E*
    exception_ptr_cast(const exception_ptr& p) noexcept; // (1) C++26

  template <class E>
  void
    exception_ptr_cast(const exception_ptr&&) = delete;  // (2) C++26
}
```
* exception_ptr[link exception_ptr.md]

## 概要
例外ポインタを指定された例外型にキャストする。

この関数は、[`std::exception_ptr`](exception_ptr.md)オブジェクトに格納されている実際の例外型を取り出すために使用できる。[`std::rethrow_exception()`](rethrow_exception.md)関数でも同様のことはできるが、こちらの方が高速である可能性がある。

- (1): [`std::exception_ptr`](exception_ptr.md)オブジェクトを、指定された例外型`E`へのポインタに変換して返す
- (2): 右辺値の[`std::exception_ptr`](exception_ptr.md)オブジェクトを引数にするのは禁止されている


## 適格要件
- 型`E`は完全型かつ[オブジェクト型](/reference/type_traits/is_object.md)であること
- 型`E`はCV修飾されていないこと
- 型`E`は配列型ではないこと
- 型`E`はポインタ型またはメンバポインタ型ではないこと
    - 注: 型`E`がポインタ型またはメンバポインタを許可してしまう場合、以下のような問題が起きる
    - 多重継承した派生型のポインタを例外送出して基底クラスのポインタ型で捕捉するような場合、`catch`節に渡ってくるのは送出された直接のポインタ値ではなく、基底クラスがどれなのかを算出するために調整されたポインタ値となり、元の例外送出された値には束縛されていないという状況になる
    - この関数は、元となる例外オブジェクトそのものへのポインタを返すことを設計目的にしているため、上記のような問題を避けるために、ポインタ型およびメンバポインタ型は許可されていない


## 戻り値
`p`がnullではなく、かつ型`const E&`のハンドラがその例外オブジェクトに対するマッチ条件を満たす場合、`p`が指す例外オブジェクトへのポインタを返す。そうでない場合は、`nullptr`を返す。


## 例外
投げない


## 例
```cpp example
#include <print>
#include <exception>
#include <stdexcept>

int main()
{
  std::exception_ptr ep;

  try {
    throw std::runtime_error("error!");
  }
  catch (...) {
    std::println("catch");
    ep = std::current_exception(); // 処理中の例外ポインタを取得
  }

  if (const std::runtime_error* e = std::exception_ptr_cast<std::runtime_error>(ep)) {
    std::println("exception: {}", e->what());
  }
}
```
* std::exception_ptr_cast[color ff0000]
* std::current_exception[link current_exception.md]
* std::exception_ptr[link exception_ptr.md]
* std::runtime_error[link /reference/stdexcept.md]

### 出力例
```
catch
exception: error!
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]


## 参照
- [P2927R3 Inspecting `exception_ptr`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2927r3.html)
- [P3748R0 Inspecting `exception_ptr` should be `constexpr`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3748r0.html)
