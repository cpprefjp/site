# コンストラクタ
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr tuple();                                        // (1) C++11
EXPLICIT constexpr tuple();                               // (1) C++17
explicit(see below) constexpr tuple();                    // (1) C++20

explicit tuple(const Types&...);                          // (2) C++11
constexpr explicit tuple(const Types&...);                // (2) C++14
EXPLICIT constexpr tuple(const Types&...);                // (2) C++17
explicit(see below) constexpr tuple(const Types&...);     // (2) C++20

template <class... UTypes>
explicit tuple(UTypes&&...);                              // (3) C++11
template <class... UTypes>
constexpr explicit tuple(UTypes&&...);                    // (3) C++14
template <class... UTypes>
EXPLICIT constexpr tuple(UTypes&&...);                    // (3) C++17
template <class... UTypes>
explicit(see below) constexpr tuple(UTypes&&...);         // (3) C++20

tuple(const tuple&) = default;                            // (4) C++11
tuple(tuple&&) = default;                                 // (5) C++11

template <class... UTypes>
tuple(const tuple<UTypes...>&);                           // (6) C++11
template <class... UTypes>
constexpr tuple(const tuple<UTypes...>&);                 // (6) C++14
template <class... UTypes>
EXPLICIT constexpr tuple(const tuple<UTypes...>&);        // (6) C++17
template <class... UTypes>
explicit(see below) constexpr
  tuple(const tuple<UTypes...>&);                         // (6) C++20

template <class... UTypes>
tuple(tuple<UTypes...>&&);                                // (7) C++11
template <class... UTypes>
constexpr tuple(tuple<UTypes...>&&);                      // (7) C++14
template <class... UTypes>
EXPLICIT constexpr tuple(tuple<UTypes...>&&);             // (7) C++17
template <class... UTypes>
explicit(see below) constexpr tuple(tuple<UTypes...>&&);  // (7) C++20

template <class U1, class U2>
tuple(const pair<U1, U2>&);                               // (8) C++11
template <class U1, class U2>
constexpr tuple(const pair<U1, U2>&);                     // (8) C++14
template <class U1, class U2>
EXPLICIT constexpr tuple(const pair<U1, U2>&);            // (8) C++17
template <class U1, class U2>
explicit(see below) constexpr tuple(const pair<U1, U2>&); // (8) C++20

template <class U1, class U2>
tuple(pair<U1, U2>&&);                                    // (9) C++11
template <class U1, class U2>
constexpr tuple(pair<U1, U2>&&);                          // (9) C++14
template <class U1, class U2>
EXPLICIT constexpr tuple(pair<U1, U2>&&);                 // (9) C++17
template <class U1, class U2>
explicit(see below) constexpr tuple(pair<U1, U2>&&);      // (9) C++20

// アロケータによる構築
template <class Alloc>
tuple(allocator_arg_t, const Alloc& a);                   // (10) C++11
template <class Alloc>
constexpr tuple(allocator_arg_t, const Alloc& a);         // (10) C++20

template <class Alloc>
tuple(allocator_arg_t,
      const Alloc& a,
      const Types&...);                                   // (11) C++11
template <class Alloc>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               const Types&...);                          // (11) C++17
template <class Alloc>
explicit(see below) constexpr tuple(allocator_arg_t,
                                    const Alloc& a,
                                    const Types&...);     // (11) C++20

template <class Alloc, class... UTypes>
tuple(allocator_arg_t,
      const Alloc& a,
      UTypes&&...);                                       // (12) C++11
template <class Alloc, class... UTypes>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               UTypes&&...);                              // (12) C++17
template <class Alloc, class... UTypes>
explicit(see below) constexpr tuple(allocator_arg_t,
                                    const Alloc& a,
                                    UTypes&&...);         // (12) C++20

template <class Alloc>
tuple(allocator_arg_t,
      const Alloc& a,
      const tuple&);                                      // (13) C++11
template <class Alloc>
constexpr tuple(allocator_arg_t,
                const Alloc& a,
                const tuple&);                            // (13) C++20

template <class Alloc>
tuple(allocator_arg_t,
      const Alloc& a,
      tuple&&);                                           // (14) C++11
template <class Alloc>
constexpr tuple(allocator_arg_t,
                const Alloc& a,
                tuple&&);                                 // (14) C++20

template <class Alloc, class... UTypes>
tuple(allocator_arg_t,
      const Alloc& a,
      const tuple<UTypes...>&);                           // (15) C++11
template <class Alloc, class... UTypes>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               const tuple<UTypes...>&);                  // (15) C++17
template <class Alloc, class... UTypes>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a,
        const tuple<UTypes...>&);                         // (15) C++20

template <class Alloc, class... UTypes>
tuple(allocator_arg_t,
      const Alloc& a,
      tuple<UTypes...>&&);                                // (16) C++11
template <class Alloc, class... UTypes>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               tuple<UTypes...>&&);                       // (16) C++17
template <class Alloc, class... UTypes>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a,
        tuple<UTypes...>&&);                              // (16) C++20

template <class Alloc, class U1, class U2>
tuple(allocator_arg_t,
      const Alloc& a,
      const pair<U1, U2>&);                               // (17) C++11
template <class Alloc, class U1, class U2>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               const pair<U1, U2>&);                      // (17) C++17
template <class Alloc, class U1, class U2>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a,
        const pair<U1, U2>&);                             // (17) C++20

template <class Alloc, class U1, class U2>
tuple(allocator_arg_t,
      const Alloc& a,
      pair<U1, U2>&&);                                    // (18) C++11
template <class Alloc, class U1, class U2>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               pair<U1, U2>&&);                           // (18) C++17
template <class Alloc, class U1, class U2>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a,
        pair<U1, U2>&&);                                  // (18) C++20
```
* pair[link /reference/utility/pair.md]
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

## tupleオブジェクトの構築
- (1) : すべての要素を初期化して構築
- (2) : 可変テンプレートパラメータの型の値によるコピー構築
- (3) : 可変テンプレートパラメータの型に変換可能な値によるムーブ構築
- (4) : コピーコンストラクタ
- (5) : ムーブコンストラクタ
- (6) : 変換可能な型からのコピーコンストラクタ
- (7) : 変換可能な型からのムーブコンストラクタ
- (8) : テンプレートパラメータ数が2の場合に、`std::pair`オブジェクトからコピー構築する
- (9) : テンプレートパラメータ数が2の場合に、`std::pair`オブジェクトからムーブ構築する
- (10) : アロケータを指定してデフォルト構築する
- (11) : アロケータを指定して可変テンプレートパラメータの型の値によってコピー構築する
- (12) : アロケータを指定して可変テンプレートパラメータの型の値によってムーブ構築する
- (13) : アロケータを指定してコピー構築
- (14) : アロケータを指定してムーブ構築
- (15) : アロケータを指定して変換可能な他の`tuple`オブジェクトからコピー構築
- (16) : アロケータを指定して変換可能な他の`tuple`オブジェクトからムーブ構築
- (17) : テンプレートパラメータ数が2の場合、アロケータを指定して`std::pair`オブジェクトからコピー構築する
- (18) : テンプレートパラメータ数が2の場合、アロケータを指定して`std::pair`オブジェクトからムーブ構築する


## テンプレートパラメータ制約
- (1), (10) :
    - `Types...`の全ての型`Ti`について、[`is_default_constructible`](/reference/type_traits/is_default_constructible.md)`<Ti>::value == true`であること
- (2), (11) :
    - `Types...`の全ての型`Ti`について、[`is_copy_constructible`](/reference/type_traits/is_copy_constructible.md)`<Ti>::value == true`であること
- (3), (12) :
    - `sizeof...(Types) == sizeof...(UTypes)`であること
    - C++17 : `sizeof...(Types) >= 1`であること
    - `Types...`の全ての型`Ti`と、`UTypes...`の全ての型`Ui`について、[`is_constructible`](/reference/type_traits/is_constructible.md)`<Ti, Ui&&>::value == true`であること
- (4), (13) :
    - `Types...`の全ての型`Ti`について、[`is_copy_constructible`](/reference/type_traits/is_copy_constructible.md)`<Ti>::value == true`であること
- (5), (14) :
    - `Types...`の全ての型`Ti`について、[`is_move_constructible`](/reference/type_traits/is_move_constructible.md)`<Ti>::value == true`であること
- (6), (15) :
    - `sizeof...(Types) == sizeof...(UTypes)`であること
    - `Types...`の全ての型`Ti`と、`UTypes...`の全ての型`Ui`について、[`is_constructible`](/reference/type_traits/is_constructible.md)`<Ti, const Ui&>::value == true`であること
    - C++17 : `sizeof(Types...) != 1`であるか、そうでなければ`Types...`の先頭を`T`、`UTypes...`の先頭をUとして、`!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const tuple<U>&, T> && !`[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, const tuple<U>&> && !`[`is_same_v`](/reference/type_traits/is_same.md)`<T, U>`が`true`であること
        - コピーコンストラクタとのオーバーロードが成立することを意図している
- (7), (16) :
    - `sizeof...(Types) == sizeof...(UTypes)`であること
    - `Types...`の全ての型`Ti`と、`UTypes...`の全ての型`Ui`について、[`is_constructible`](/reference/type_traits/is_constructible.md)`<Ti, Ui&&>::value == true`であること
    - C++17 : `sizeof(Types...) != 1`であるか、そうでなければ`Types...`の先頭を`T`、`UTypes...`の先頭をUとして、`!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<tuple<U>, T> && !`[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, tuple<U>> && !`[`is_same_v`](/reference/type_traits/is_same.md)`<T, U>`が`true`であること
        - ムーブコンストラクタとのオーバーロードが成立することを意図している
- (8), (17) :
    - `Types...`の0番目の型を`T0`、1番目の型を`T1`であるとする
    - `sizeof...(Types) == 2`であること
    - [`is_constructible`](/reference/type_traits/is_constructible.md)`<T0, const U1&>::value == true`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T1, const U2&>::value == true`であること
- (9), (18) :
    - `Types...`の0番目の型を`T0`、1番目の型を`T1`であるとする
    - `sizeof...(Types) == 2`であること
    - [`is_constructible`](/reference/type_traits/is_constructible.md)`<T0, U1&&>::value == true`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T1, U2&&>::value == true`であること


## 備考
- (1) :
    - C++17 : `Types...`のうちいずれかの型が非暗黙にデフォルト構築できる場合、この関数は`explicit`となる
- (2) :
    - C++11からC++14まで : 無条件で`explicit`となる
    - C++17から : `!`[`conjunction_v`](/reference/type_traits/conjunction.md)`<`[`is_convertible`](/reference/type_traits/is_convertible.md)`<const Types&, Types>...>`である場合、この関数は`explicit`となる
- (3) :
    - C++11からC++14まで : 無条件で`explicit`となる
    - C++17から : `!`[`conjunction_v`](/reference/type_traits/conjunction.md)`<`[`is_convertible`](/reference/type_traits/is_convertible.md)`<UTypes, Types>...>`である場合、この関数は`explicit`となる
- (6) :
    - C++17 : `!`[`conjunction_v`](/reference/type_traits/conjunction.md)`<`[`is_convertible`](/reference/type_traits/is_convertible.md)`<const Types&, Types>...>`である場合、この関数は`explicit`となる
- (7) :
    - C++17 : `!`[`conjunction_v`](/reference/type_traits/conjunction.md)`<`[`is_convertible`](/reference/type_traits/is_convertible.md)`<UTypes, Types>...>`である場合、この関数は`explicit`となる
- (8) :
    - `Types...`の0番目の型を`T0`、1番目の型を`T1`であるとする
    - `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U1, T0> || !`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U2, T1>`である場合、この関数は`explicit`となる
- (11) :
    - C++17 : (2)と同じ条件で`explicit`となる
- (12) :
    - C++17 : (3)と同じ条件で`explicit`となる
- (15) :
    - C++17 : (6)と同じ条件で`explicit`となる
- (16) :
    - C++17 : (7)と同じ条件で`explicit`となる
- (17) :
    - C++17 : (8)と同じ条件で`explicit`となる
- (18) :
    - C++17 : (9)と同じ条件で`explicit`となる
- C++17では、コンストラクタの各オーバーロードが条件付きで`explicit`となるよう規定された。これは、以下のような初期化子リストを使用したC++17での初期化が不適格になっていたため、適格になるようにするための変更である：
    ```cpp
    std::tuple<int, int> pixel_coordinates()
    {
      return {10, -15};  // C++14でコンパイルエラー！
    }

    struct NonCopyable { NonCopyable(int); NonCopyable(const NonCopyable&) = delete; };
    std::pair<NonCopyable, double> pmd{42, 3.14};  // C++14でコンパイルエラー！
    ```

    - この変更はC++17に対するものであるが、コンパイラが早期に対応していたため、一部処理系ではC++14の段階から適格となっていた


## 例
```cpp example
#include <tuple>
#include <string>
#include <utility>

int main()
{
  // デフォルトコンストラクト
  std::tuple<int, char, std::string> t1;

  // コピーコンストラクト
  std::tuple<int, char, std::string> t2(t1);

  // ムーブコンストラクト
  std::tuple<int, char, std::string> t3(std::move(t2));

  // 値を指定して構築
  std::tuple<int, char, std::string> t4(1, 'a', "hello");

  // pairから構築(2要素の場合のみ)
  std::tuple<int, char> t5 = std::make_pair(1, 'a');

  // アロケータを指定して構築。
  // std::allocator_argを第1引数にすると、第2引数がアロケータと見なされ、
  // 第3引数以降がtupleの要素となる
  std::tuple<int, char, std::string> t6(std::allocator_arg,
                                        std::allocator<std::tuple<int, char, std::string>>(),
                                        1, 'a', "hello");
}
```
* std::move[link /reference/utility/move.md]
* std::allocator_arg[link /reference/memory/allocator_arg_t.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 


## 関連項目
- [C++20 関数を条件付きでexplicitにする構文を追加](/lang/cpp20/explicit_bool.md)


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [N4387 Improving Pair and Tuple (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4387)
    - C++17での条件付き`explicit`の導入
- [LWG Issue 2549. Tuple EXPLICIT constructor templates that take tuple parameters end up taking references to temporaries and will create dangling references](https://wg21.cmeerw.net/lwg/issue2549)
- [P1032R1 Misc constexpr bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
- [P0892R2 `explicit(bool)`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0892r2.html)
    - C++20での`explicit(bool)`構文への対応
