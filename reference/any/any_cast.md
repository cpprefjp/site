# any_cast
* any[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  T any_cast(const any& operand);                 // (1)

  template <class T>
  T any_cast(any& operand);                       // (2)

  template <class T>
  T any_cast(any&& operand);                      // (3)

  template <class T>
  const T* any_cast(const any* operand) noexcept; // (4)

  template <class T>
  T* any_cast(any* operand) noexcept;             // (5)
}
```
* any[link any.md]

## 概要
[`std::any`](any.md)オブジェクトが保持している値を取り出す。この関数に指定する型は、`any`オブジェクトが保持している値が変換可能な型ではなく、保持している値の型と (`const`/参照の修飾を除いて) 同じでなければならない。

- (1), (2), (3) : `std::any`オブジェクトが保持している型を指定して、その値のコピーまたは参照を取得する。コピーで取り出す場合は`any_cast<int>(x)`、参照で取り出す場合は`any_cast<int&>(x)`のように指定する。型の指定を間違った場合は例外が送出される
- (4), (5) : `std::any`オブジェクトが保持している型を指定して、その値を指すポインタを取得する。型の指定を間違った場合はヌルポインタが返る


## 適格要件
`using U =` [`remove_cv_t`](/reference/type_traits/remove_cv.md)`<`[`remove_reference_t`](/reference/type_traits/remove_reference.md)`<T>>;`であるとして、

- (1) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, const U&> == true`であること。そうでない場合、プログラムは不適格となる
- (2) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, U&> == true`であること。そうでない場合、プログラムは不適格となる
- (3) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, U> == true`であること。そうでない場合、プログラムは不適格となる
- (4)(5) : [`is_void_v`](/reference/type_traits/is_void.md)`<T> == false`であること
    - C++26から

## 効果
`using U =` [`remove_cv_t`](/reference/type_traits/remove_cv.md)`<`[`remove_reference_t`](/reference/type_traits/remove_reference.md)`<T>>;`であるとして、

- (1), (2) : `operand`オブジェクトが保持している`U`型オブジェクトを返す
- (3) : `operand`オブジェクトが保持している`U`型オブジェクトをムーブして返す
- (4), (5) : `operand != nullptr`かつ[`operand->type()`](any/type.md) `== typeid(T)`である場合、`operand`が保持している`T`型オブジェクトへのポインタを返す


## 例外
- (1), (2), (3) : [`operand.type()`](any/type.md) `!= typeid(U)`である場合、[`bad_any_cast`](bad_any_cast.md)例外を送出する


## 例
```cpp example
#include <cassert>
#include <any>
#include <string>

int main()
{
  // (1)
  {
    const std::any x = 3;

    // コピーを取り出す
    int r1 = std::any_cast<int>(x);
    assert(r1 == 3);

    // 参照を取り出す
    const int& r2 = std::any_cast<const int&>(x);
    assert(r2 == 3);

    // xオブジェクトが保持している値はint型で、long long型に変換可能だが、
    // any_cast関数には直接の型intを指定しなければならない
    try {
      std::any_cast<long long>(x);
      assert(false);
    }
    catch (std::bad_any_cast& e) {
      // 型の指定を間違うと、bad_any_cast例外が送出される
      assert(true);
    }
  }

  // (2)
  {
    std::any x = std::string{"Hello"};

    // コピーを取り出す
    std::string r1 = std::any_cast<std::string>(x);
    assert(r1 == "Hello");

    // 参照を取り出す
    std::string& r2 = std::any_cast<std::string&>(x);
    assert(r2 == "Hello");
  }

  // (3)
  {
    std::any x = std::string{"Hello"};

    // anyクラスの一時オブジェクトから値をムーブして取り出す
    std::string r = std::any_cast<std::string>(std::move(x));
    assert(r == "Hello");
  }

  // (4)
  {
    const std::any x = 3;

    // 保持している値へのポインタを取り出す
    const int* p1 = std::any_cast<int>(&x);
    assert(*p1 == 3);

    // 型の指定を間違うとヌルポインタが返る
    const long long* p2 = std::any_cast<long long>(&x);
    assert(p2 == nullptr);
  }

  // (5)
  {
    std::any x = 3;

    // 保持している値へのポインタを取り出す
    int* p1 = std::any_cast<int>(&x);
    assert(*p1 == 3);

    // 型の指定を間違うとヌルポインタが返る
    long long* p2 = std::any_cast<long long>(&x);
    assert(p2 == nullptr);
  }
}
```
* std::any_cast[color ff0000]
* std::any[link any.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [LWG Issue 3305. `any_cast<void>`](https://cplusplus.github.io/LWG/issue3305)