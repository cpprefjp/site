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

template<class... UTypes>
explicit(see below) constexpr tuple(tuple<UTypes...>&);   // (6) C++23

template <class... UTypes>
tuple(const tuple<UTypes...>&);                           // (7) C++11
template <class... UTypes>
constexpr tuple(const tuple<UTypes...>&);                 // (7) C++14
template <class... UTypes>
EXPLICIT constexpr tuple(const tuple<UTypes...>&);        // (7) C++17
template <class... UTypes>
explicit(see below) constexpr
  tuple(const tuple<UTypes...>&);                         // (7) C++20

template <class... UTypes>
tuple(tuple<UTypes...>&&);                                // (8) C++11
template <class... UTypes>
constexpr tuple(tuple<UTypes...>&&);                      // (8) C++14
template <class... UTypes>
EXPLICIT constexpr tuple(tuple<UTypes...>&&);             // (8) C++17
template <class... UTypes>
explicit(see below) constexpr tuple(tuple<UTypes...>&&);  // (8) C++20

template<class... UTypes>
explicit(see below) constexpr 
  tuple(const tuple<UTypes...>&&);                        // (9) C++23

template<class U1, class U2>
explicit(see below) constexpr tuple(pair<U1, U2>&);       // (10) C++23

template <class U1, class U2>
tuple(const pair<U1, U2>&);                               // (11) C++11
template <class U1, class U2>
constexpr tuple(const pair<U1, U2>&);                     // (11) C++14
template <class U1, class U2>
EXPLICIT constexpr tuple(const pair<U1, U2>&);            // (11) C++17
template <class U1, class U2>
explicit(see below) constexpr tuple(const pair<U1, U2>&); // (11) C++20

template <class U1, class U2>
tuple(pair<U1, U2>&&);                                    // (12) C++11
template <class U1, class U2>
constexpr tuple(pair<U1, U2>&&);                          // (12) C++14
template <class U1, class U2>
EXPLICIT constexpr tuple(pair<U1, U2>&&);                 // (12) C++17
template <class U1, class U2>
explicit(see below) constexpr tuple(pair<U1, U2>&&);      // (12) C++20

template<class U1, class U2>
explicit(see below) constexpr
  tuple(const pair<U1, U2>&&);                            // (13) C++23

template<tuple-like UTuple>
  explicit(see below) constexpr tuple(UTuple&&);          // (14) C++23


// 以下アロケータを指定する構築
template <class Alloc>
tuple(allocator_arg_t, const Alloc& a);                   // (15) C++11
template <class Alloc>
explicit(see below) constexpr 
  tuple(allocator_arg_t, const Alloc& a);                 // (15) C++20

template <class Alloc>
tuple(allocator_arg_t,
      const Alloc& a,
      const Types&...);                                   // (16) C++11
template <class Alloc>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               const Types&...);                          // (16) C++17
template <class Alloc>
explicit(see below) constexpr tuple(allocator_arg_t,
                                    const Alloc& a,
                                    const Types&...);     // (16) C++20

template <class Alloc, class... UTypes>
tuple(allocator_arg_t,
      const Alloc& a,
      UTypes&&...);                                       // (17) C++11
template <class Alloc, class... UTypes>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               UTypes&&...);                              // (17) C++17
template <class Alloc, class... UTypes>
explicit(see below) constexpr tuple(allocator_arg_t,
                                    const Alloc& a,
                                    UTypes&&...);         // (17) C++20

template <class Alloc>
tuple(allocator_arg_t,
      const Alloc& a,
      const tuple&);                                      // (18) C++11
template <class Alloc>
constexpr tuple(allocator_arg_t,
                const Alloc& a,
                const tuple&);                            // (18) C++20

template <class Alloc>
tuple(allocator_arg_t,
      const Alloc& a,
      tuple&&);                                           // (19) C++11
template <class Alloc>
constexpr tuple(allocator_arg_t,
                const Alloc& a,
                tuple&&);                                 // (19) C++20

template<class Alloc, class... UTypes>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a, 
        tuple<UTypes...>&);                               // (20) C++23

template <class Alloc, class... UTypes>
tuple(allocator_arg_t,
      const Alloc& a,
      const tuple<UTypes...>&);                           // (21) C++11
template <class Alloc, class... UTypes>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               const tuple<UTypes...>&);                  // (21) C++17
template <class Alloc, class... UTypes>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a,
        const tuple<UTypes...>&);                         // (21) C++20

template <class Alloc, class... UTypes>
tuple(allocator_arg_t,
      const Alloc& a,
      tuple<UTypes...>&&);                                // (22) C++11
template <class Alloc, class... UTypes>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               tuple<UTypes...>&&);                       // (22) C++17
template <class Alloc, class... UTypes>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a,
        tuple<UTypes...>&&);                              // (22) C++20

template<class Alloc, class... UTypes>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a,
        const tuple<UTypes...>&&);                        // (23) C++23

template<class Alloc, class U1, class U2>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a, 
        pair<U1, U2>&);                                   // (24) C++23

template <class Alloc, class U1, class U2>
tuple(allocator_arg_t,
      const Alloc& a,
      const pair<U1, U2>&);                               // (25) C++11
template <class Alloc, class U1, class U2>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               const pair<U1, U2>&);                      // (25) C++17
template <class Alloc, class U1, class U2>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a,
        const pair<U1, U2>&);                             // (25) C++20

template <class Alloc, class U1, class U2>
tuple(allocator_arg_t,
      const Alloc& a,
      pair<U1, U2>&&);                                    // (26) C++11
template <class Alloc, class U1, class U2>
EXPLICIT tuple(allocator_arg_t,
               const Alloc& a,
               pair<U1, U2>&&);                           // (26) C++17
template <class Alloc, class U1, class U2>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a,
        pair<U1, U2>&&);                                  // (26) C++20

template<class Alloc, class U1, class U2>
explicit(see below) constexpr
  tuple(allocator_arg_t,
        const Alloc& a, 
        const pair<U1, U2>&&);                            // (27) C++23

template<class Alloc, tuple-like UTuple>
explicit(see below) constexpr
  tuple(allocator_arg_t, const Alloc& a, UTuple&&);       // (28) C++23
```
* see below[italic]
* EXPLICIT[italic]
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]
* tuple-like[link ../tuple-like.md]
* see below[italic]

## tupleオブジェクトの構築
- (1) : デフォルトコンストラクタ（すべての要素を初期化して構築）
- (2) : 可変テンプレートパラメータの型の値によるコピー構築
- (3) : 可変テンプレートパラメータの型に変換可能な値によるムーブ構築
- (4) : コピーコンストラクタ
- (5) : ムーブコンストラクタ
- (6)-(9) : 変換可能な他の[`tuple`](../tuple.md)オブジェクトから構築
    - (6), (7), (9) はコピー構築、(8) はムーブ構築される
- (10)-(13) : テンプレートパラメータ数が2の場合、[`std::pair`](/reference/utility/pair.md)オブジェクトから構築する
    - (10), (11), (13) はコピー構築、(12) はムーブ構築される
- (14) : [`tuple-like`](../tuple-like.md)なオブジェクトから構築する

以下 (15)-(28) は (1)-(14) のアロケータ指定版であり、アロケータを指定する事以外は (1)-(14) と等価である。

- (15) : アロケータを指定してデフォルト構築する
- (16) : アロケータを指定して可変テンプレートパラメータの型の値によってコピー構築する
- (17) : アロケータを指定して可変テンプレートパラメータの型の値によってムーブ構築する
- (18) : アロケータを指定してコピー構築
- (19) : アロケータを指定してムーブ構築
- (20)-(23) : アロケータを指定して変換可能な他の[`tuple`](../tuple.md)オブジェクトから構築
    - (20), (21), (23) はコピー構築、(22) はムーブ構築される
- (24)-(27) : テンプレートパラメータ数が2の場合、アロケータを指定して[`std::pair`](/reference/utility/pair.md)オブジェクトから構築する
    - (24), (25), (27) はコピー構築、(26) はムーブ構築される
- (28) : アロケータを指定して[`tuple-like`](../tuple-like.md)なオブジェクトから構築する


## テンプレートパラメータ制約
- (1), (15) :
    - `Types...`の全ての型`Ti`について、[`is_default_constructible`](/reference/type_traits/is_default_constructible.md)`<Ti>::value == true`であること
- (2), (16) :
    - `Types...`の全ての型`Ti`について、[`is_copy_constructible`](/reference/type_traits/is_copy_constructible.md)`<Ti>::value == true`であること
- (3), (17) :
    - `sizeof...(Types) == sizeof...(UTypes)`であること
    - C++20まで : `Types...`の全ての型`Ti`と、`UTypes...`の全ての型`Ui`について、[`is_constructible`](/reference/type_traits/is_constructible.md)`<Ti, Ui&&>::value == true`であること
    - C++17 : `sizeof...(Types) >= 1`であること
    - C++23 : `disambiguating-constraint`を次のように定義して、
        - `sizeof...(Types) == 1`の時、[`negation`](/reference/type_traits/negation.md)`<`[`is_same`](/reference/type_traits/is_same.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U0>,` [`tuple`](../tuple.md)`>>`
        - `sizeof...(Types) == 2 || sizeof...(Types) == 3`の時、[`bool_constant`](/reference/type_traits/bool_constant.md)`<!`[`is_same_v`](/reference/type_traits/is_same.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U0>,` [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`> ||` [`is_same_v`](/reference/type_traits/is_same.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<T0>,` [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`>>`
        - 以上に該当しなければ、[`true_type`](/reference/type_traits/true_type.md)
    - C++23 : [`conjunction_v`](/reference/type_traits/conjunction.md)`<disambiguating-constraint,` [`is_constructible`](/reference/type_traits/is_constructible.md)`<Types, UTypes>...>`であること
- (4), (18) :
    - `Types...`の全ての型`Ti`について、[`is_copy_constructible`](/reference/type_traits/is_copy_constructible.md)`<Ti>::value == true`であること
- (5), (19) :
    - `Types...`の全ての型`Ti`について、[`is_move_constructible`](/reference/type_traits/is_move_constructible.md)`<Ti>::value == true`であること
- (6)-(9), (20)-(23) :
    - `I`をパラメータパック`0, 1, ..., (sizeof...(Types) - 1)`、`FWD(u)`を`static_cast<decltype(u)>(u)`、`sizeof...(Types) == 1`の場合は、`Types...`を`T`へ、`UTypes...`を`U`へ展開したと定義して
    - C++23 : `sizeof...(Types) == sizeof...(UTypes) && (`[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Types, decltype(`[`get`](/reference/tuple/tuple/get.md)`<I>(FWD(u)))> && ...) == true`であること
    - C++23 : 更に、`sizeof...(Types) != 1`または、[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<decltype(u), T> == false &&` [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, decltype(u)> == false &&` [`is_same_v`](/reference/type_traits/is_same.md)`<T, U> == false`であること
- (7), (21) :
    - `sizeof...(Types) == sizeof...(UTypes)`であること
    - `Types...`の全ての型`Ti`と、`UTypes...`の全ての型`Ui`について、[`is_constructible`](/reference/type_traits/is_constructible.md)`<Ti, const Ui&>::value == true`であること
    - C++17 : `sizeof(Types...) != 1`であるか、そうでなければ`Types...`の先頭を`T`、`UTypes...`の先頭を`U`として、`!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const tuple<U>&, T> && !`[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, const tuple<U>&> && !`[`is_same_v`](/reference/type_traits/is_same.md)`<T, U>`が`true`であること
        - コピーコンストラクタとのオーバーロードが成立することを意図している
    - C++23 : (6)-(9), (20)-(23) の定義参照
- (8), (22) :
    - `sizeof...(Types) == sizeof...(UTypes)`であること
    - `Types...`の全ての型`Ti`と、`UTypes...`の全ての型`Ui`について、[`is_constructible`](/reference/type_traits/is_constructible.md)`<Ti, Ui&&>::value == true`であること
    - C++17 : `sizeof(Types...) != 1`であるか、そうでなければ`Types...`の先頭を`T`、`UTypes...`の先頭をUとして、`!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<tuple<U>, T> && !`[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, tuple<U>> && !`[`is_same_v`](/reference/type_traits/is_same.md)`<T, U>`が`true`であること
        - ムーブコンストラクタとのオーバーロードが成立することを意図している
    - C++23 : (6)-(9), (20)-(23) の定義参照
- (10)-(13), (24)-(27) :
    - `FWD(u)`を`static_cast<decltype(u)>(u)`、`Types...`の0番目の型を`T0`、1番目の型を`T1`であるとして、
    - C++23 : `sizeof...(Types) == 2`であること
    - C++23 : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T0, decltype(get<0>(FWD(u))) == true`であること
    - C++23 : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T1, decltype(get<1>(FWD(u))) == true`であること
- (11), (25) :
    - `Types...`の0番目の型を`T0`、1番目の型を`T1`であるとする
    - `sizeof...(Types) == 2`であること
    - [`is_constructible`](/reference/type_traits/is_constructible.md)`<T0, const U1&>::value == true`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T1, const U2&>::value == true`であること
    - C++23 : (10)-(13), (24)-(27) の定義参照
- (12), (26) :
    - `Types...`の0番目の型を`T0`、1番目の型を`T1`であるとする
    - `sizeof...(Types) == 2`であること
    - [`is_constructible`](/reference/type_traits/is_constructible.md)`<T0, U1&&>::value == true`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T1, U2&&>::value == true`であること
    - C++23 : (10)-(13), (24)-(27) の定義参照
- (14), (28) :
    - C++23 : [`tuple-like`](../tuple-like.md)`<UTuple>`であること
    - C++23 : [`different-from`](/reference/ranges/different-from.md)`<UTuple, tuple>`であること
    - C++23 : [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<UTuple>`が[`ranges::subrange`](/reference/ranges/subrange.md)の特殊化でないこと
    - C++23 : `sizeof...(Types) ==` [`tuple_size_v`](../tuple_size.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<UTuple>>`であること
    - C++23 : `(`[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Types, decltype(get<I>(`[`std::forward`](/reference/utility/forward.md)`<UTuple>(u)))> && ...) == true`であること
    - C++23 : `sizeof...(Types) != 1`であるか、または`Types...`を`T`に展開したとして[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<UTuple, T> == false &&` [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, UTuple> == false`であること


## 備考
- (1) :
    - C++17 : `Types...`のうちいずれかの型が非暗黙にデフォルト構築できる場合、この関数は`explicit`となる
- (2) :
    - C++11からC++14まで : 無条件で`explicit`となる
    - C++17から : `!`[`conjunction_v`](/reference/type_traits/conjunction.md)`<`[`is_convertible`](/reference/type_traits/is_convertible.md)`<const Types&, Types>...>`である場合、この関数は`explicit`となる
- (3) :
    - C++11からC++14まで : 無条件で`explicit`となる
    - C++17から : `!`[`conjunction_v`](/reference/type_traits/conjunction.md)`<`[`is_convertible`](/reference/type_traits/is_convertible.md)`<UTypes, Types>...>`である場合、この関数は`explicit`となる
    - C++23から : `(`[`reference_constructs_from_temporary_v`](/reference/type_traits/reference_constructs_from_temporary.md)`<Types, UTypes&&> || ...)`である場合、この関数は削除定義される
- (6)-(9) :
    - `I`をパラメータパック`0, 1, ..., (sizeof...(Types) - 1)`、`FWD(u)`を`static_cast<decltype(u)>(u)`と定義して、
    - C++23 : `!(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<decltype(`[`get`](../tuple/get.md)`<I>(FWD(u))), Types> && ...)`である場合、この関数は`explicit`となる
    - C++23 : `(`[`reference_constructs_from_temporary_v`](/reference/type_traits/reference_constructs_from_temporary.md)`<Types, decltype(`[`get`](../tuple/get.md)`<I>(FWD(u)))> || ...)`である場合、この関数は削除定義される
- (7) :
    - C++17 : `!`[`conjunction_v`](/reference/type_traits/conjunction.md)`<`[`is_convertible`](/reference/type_traits/is_convertible.md)`<const Types&, Types>...>`である場合、この関数は`explicit`となる
    - C++23 : (6)-(9) の定義参照
- (8) :
    - C++17 : `!`[`conjunction_v`](/reference/type_traits/conjunction.md)`<`[`is_convertible`](/reference/type_traits/is_convertible.md)`<UTypes&&, Types>...>`である場合、この関数は`explicit`となる
    - C++23 : (6)-(9) の定義参照
- (10)-(13) :
    - `FWD(u)`を`static_cast<decltype(u)>(u)`、`Types...`の0番目の型を`T0`、1番目の型を`T1`であるとして、
    - C++23 : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<decltype(`[`get`](/reference/utility/pair/get.md)`<0>(FWD(u))), T0> ||!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<decltype(`[`get`](/reference/utility/pair/get.md)`<1>(FWD(u))), T1>`である場合、この関数は`explicit`となる
    - C++23 : [`reference_constructs_from_temporary_v`](/reference/type_traits/reference_constructs_from_temporary.md)`<T0, decltype(`[`get`](/reference/utility/pair/get.md)`<0>(FWD(u)))> ||` [`reference_constructs_from_temporary_v`](/reference/type_traits/reference_constructs_from_temporary.md)`<T1, decltype(`[`get`](/reference/utility/pair/get.md)`<1>(FWD(u)))>`である場合、この関数は削除定義される
- (11) :
    - `Types...`の0番目の型を`T0`、1番目の型を`T1`であるとする
    - C++17 : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const U1&, T0> || !`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const U2&, T1>`である場合、この関数は`explicit`となる
    - C++23 : (10)-(13) の定義参照
- (12) :
    - `Types...`の0番目の型を`T0`、1番目の型を`T1`であるとする
    - C++17 : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U1&&, T0> || !`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U2&&, T1>`である場合、この関数は`explicit`となる
    - C++23 : (10)-(13) の定義参照
- (14) :
    - `I`をパラメータパック`0, 1, ..., (sizeof...(Types) - 1)`と定義して、
    - C++23 : `!(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<decltype(get<I>(`[`std::forward`](/reference/utility/forward.md)`<UTuple>(u))), Types> && ...)`である場合、この関数は`explicit`となる
- (15) :
    - C++20 : 対応するコンストラクタ (1) と同じ条件で`explicit`となる
- (16) :
    - C++17 : 対応するコンストラクタ (2) と同じ条件で`explicit`となる
- (17) :
    - C++17 : 対応するコンストラクタ (3) と同じ条件で`explicit`となる
    - C++23 : 対応するコンストラクタ (3) と同じ条件で削除定義される
- (20), (23) : 
    - C++23 : それぞれ対応するコンストラクタ (6), (9) と同じ条件で`explicit`となる
    - C++23 : それぞれ対応するコンストラクタ (6), (9) と同じ条件で削除定義される
- (21), (22) : 
    - C++17 : それぞれ対応するコンストラクタ (7), (8) と同じ条件で`explicit`となる
    - C++23 : それぞれ対応するコンストラクタ (7), (8) と同じ条件で削除定義される
- (24), (27) :
    - C++23 : それぞれ対応するコンストラクタ (10), (13) と同じ条件で`explicit`となる
    - C++23 : それぞれ対応するコンストラクタ (10), (13) と同じ条件で削除定義される
- (25), (26) :
    - C++17 : それぞれ対応するコンストラクタ (11), (12) と同じ条件で`explicit`となる
    - C++23 : それぞれ対応するコンストラクタ (11), (12) と同じ条件で削除定義される
- (28) :
    - C++23 : それぞれ対応するコンストラクタ (14) と同じ条件で`explicit`となる

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

- C++23 では、ダングリング参照の作成が簡単にできていた状態を改善するべく、[`reference_constructs_from_temporary`](/reference/type_traits/reference_constructs_from_temporary.md)が追加され、ダングリング参照が作成される場合には不適格とするようになった :
    ```cpp
    // コンストラクタ引数で std::string が構築され
    // その一時オブジェクトが束縛されるため、ダングリング参照となっていた
    // C++23 からは不適格であり、コンパイルエラー等で未然に防がれる
    std::tuple<const std::string&, const std::string&> x("hello", "world");
    ```

## 例
```cpp example
#include <tuple>
#include <string>
#include <utility>

int main()
{
  // デフォルト構築
  std::tuple<int, char, std::string> t1;

  // コピー構築
  std::tuple<int, char, std::string> t2(t1);

  // ムーブ構築
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
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
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
- [P2165R4 Compatibility between `tuple`, `pair` and *tuple-like* objects](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2165r4.pdf)
    - [`tuple-like`](/reference/tuple/tuple-like.md)なオブジェクトからの構築
- [P2255R2 A type trait to detect reference binding to temporary](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2255r2.html)
    - 参照型を要素に持つ場合にダングリング参照が容易に作成できていたのを不適格にする
- [LWG 3121 tuple constructor constraints for UTypes&&... overloads](https://cplusplus.github.io/LWG/issue3121)
    - C++23 での (3) のコンストラクタの制約の変更（`disambiguating-constraint`等）について
- [P2321R2 `zip`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2321r2.html#tuple)
    - すべての要素が[プロキシ参照](/reference/iterator/indirectly_writable.md)の場合、[プロキシ参照](/reference/iterator/indirectly_writable.md)として使用できるようにする
