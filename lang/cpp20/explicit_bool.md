# 関数を条件付きでexplicitにする構文を追加
* cpp20[meta cpp]

## 概要
C++20では、関数を条件付きで`explicit`にする構文が追加された。コンストラクタと変換演算�に指定する`explicit`指定�に、`explicit(true)`、`explicit(false)`のように`bool`に変換可能な定数式を指定する。`true`に評価される値を指定することで、その関数は`explicit`となる。

```cpp
template <bool Cond>
struct X {
  explicit(Cond) X() {}
};

X<false> f1() { return {}; }         // OK
//X<true> f2() { return {}; }        // コンパイルエラー！
X<false> f3() { return X<false>{}; } // OK
X<true> f4() { return X<true>{}; }   // OK

int main()
{
  X<false> x1 = {};  // OK
  //X<true> x2 = {}; // コンパイルエラー！

  X<false> x3{};     // OK
  X<true> x4{};      // OK
}
```

これは、関数テンプレートのコンストラクタにおいて、自身に暗黙変換可能なパラメータを受け取る場合は非`explicit`にするために使用できる。

コンストラクタだけではなく、型変換演算�もまた、条件付き`explicit`にできる：

```cpp
struct X {
  explicit(true) operator bool() const { return true; }
};
```


## 例
```cpp example
#include <type_traits>
#include <string>
#include <vector>

template <class T>
class AnyValue {
  T value_;
public:
  template <class U>
  explicit(!std::is_convertible_v<U, T>)
  AnyValue(U value) : value_(value) {}

  const T& get() const { return value_; }
};

// const char*はstd::stringに暗黙変換可能
AnyValue<std::string> f1() { return "Hello"; }   // OK
AnyValue<std::string> f2() { return {"Hello"}; } // OK

// intはstd::vector<int>に暗黙変換できないので、
// 要素数を指定するコンストラクタを呼び出すという意図を明確に伝えないといけない
//AnyValue<std::vector<int>> f3()
//{
//  return 1; // コンパイルエラー！
//}

//AnyValue<std::vector<int>> f4()
//{
//  return {1}; // コンパイルエラー！
//}
AnyValue<std::vector<int>> f5()
{
  return AnyValue<std::vector<int>>{1}; // OK
}

int main() {}
```
* std::is_convertible_v[link /reference/type_traits/is_convertible.md]

### 出力
```
```


## この機能が必要になった背景・経緯
C++14では、[`std::tuple`](/reference/tuple/tuple.md)と[`std::pair`](/reference/utility/pair.md)の初期化�リストを使用した以下の初期化が不適格となっていた：

```cpp
std::tuple<int, int> pixel_coordinates()
{
  return {10, -15};  // C++14でコンパイルエラー！
}

struct NonCopyable { NonCopyable(int); NonCopyable(const NonCopyable&) = delete; };
std::pair<NonCopyable, double> pmd{42, 3.14};  // C++14でコンパイルエラー！
```
* std::tuple[link /reference/tuple/tuple.md]

この問題に対して、C++17では (対応が早い処理系はそれ以前から) これらのクラスのコンストラクタが、条件付きで`explicit`定義されるようにした。その実装方法としてはSFINAEによって、`explicit`コンストラクタと非`explicit`コンストラクタをオーバー�ードする方法が使われていた。

```cpp
template <typename T1, typename T2>
struct pair {
  template <typename U1=T1, typename U2=T2,
    std::enable_if_t<
      std::is_constructible_v<T1, U1> &&
      std::is_constructible_v<T2, U2> &&
      std::is_convertible_v<U1, T1> &&
      std::is_convertible_v<U2, T2>
    , int> = 0>
  constexpr pair(U1&&, U2&&);

  template <typename U1=T1, typename U2=T2,
    std::enable_if_t<
      std::is_constructible_v<T1, U1> &&
      std::is_constructible_v<T2, U2> &&
      !(std::is_convertible_v<U1, T1> &&
        std::is_convertible_v<U2, T2>)
    , int> = 0>
  explicit constexpr pair(U1&&, U2&&);
};
```
* std::enable_if_t[link /reference/type_traits/enable_if.md]
* std::is_constructible_v[link /reference/type_traits/is_constructible.md]
* std::is_convertible_v[link /reference/type_traits/is_convertible.md]

SFINAEによるオーバー�ードはパラメータ型を制約するために依然として必要だが、関数ボディの実装が共通である`explicit`コンストラクタと非`explicit`コンストラクタは、オーバー�ードではなく条件による切り替えをしたかったため、条件付きで関数を`explicit`にする構文が追加されることとなった。これを使用した場合、前述した[`std::pair`](/reference/utility/pair.md)のコンストラクタは、以下のように宣言できる：

```cpp
template <typename T1, typename T2>
struct pair {
  template <typename U1=T1, typename U2=T2,
    std::enable_if_t<
      std::is_constructible_v<T1, U1> &&
      std::is_constructible_v<T2, U2>
    , int> = 0>
  explicit(!std::is_convertible_v<U1, T1> || !std::is_convertible_v<U2, T2>)
  constexpr pair(U1&&, U2&&);
};
```
* std::enable_if_t[link /reference/type_traits/enable_if.md]
* std::is_constructible_v[link /reference/type_traits/is_constructible.md]
* std::is_convertible_v[link /reference/type_traits/is_convertible.md]

コンセプトを使用した場合は、以下のようになる：

```cpp
template <typename T1, typename T2>
struct pair {
  template <typename U1=T1, typename U2=T2>
    requires std::is_constructible_v<T1, U1> &&
      std::is_constructible_v<T2, U2>
  explicit(!std::is_convertible_v<U1, T1> || !std::is_convertible_v<U2, T2>)
  constexpr pair(U1&&, U2&&);
};
```
* std::is_constructible_v[link /reference/type_traits/is_constructible.md]
* std::is_convertible_v[link /reference/type_traits/is_convertible.md]


## 関連項目
- [`pair`のコンストラクタ](/reference/utility/pair/op_constructor.md)
- [`tuple`のコンストラクタ](/reference/tuple/tuple/op_constructor.md)
- [`optional`のコンストラクタ](/reference/optional/optional/op_constructor.md)


## 参照
- [P0892R2 explicit(bool)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0892r2.html)
