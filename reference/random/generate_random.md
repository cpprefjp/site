# generate_random
* random[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::ranges {
  template <class R, class G>
    requires output_range<R, invoke_result_t<G&>> &&
             uniform_random_bit_generator<remove_cvref_t<G>>
  constexpr borrowed_iterator_t<R>
    generate_random(R&& r, G&& g);                  // (1) C++26

  template <class G,
            output_iterator<invoke_result_t<G&>> O,
            sentinel_for<O> S>
    requires uniform_random_bit_generator<remove_cvref_t<G>>
  constexpr O
    generate_random(O first, S last, G&& g);        // (2) C++26

  template <class R, class G, class D>
    requires output_range<R, invoke_result_t<D&, G&>> &&
             invocable<D&, G&> &&
             uniform_random_bit_generator<remove_cvref_t<G>>
  constexpr borrowed_iterator_t<R>
    generate_random(R&& r, G&& g, D&& d);           // (3) C++26

  template <class G,
            class D,
            output_iterator<invoke_result_t<D&, G&>> O,
            sentinel_for<O> S>
    requires invocable<D&, G&> &&
             uniform_random_bit_generator<remove_cvref_t<G>>
  constexpr O
    generate_random(O first, S last, G&& g, D&& d); // (4) C++26
}
```
* uniform_random_bit_generator[link uniform_random_bit_generator.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
乱数列を生成する。

- (1) : 出力範囲`r`の各要素に、乱数生成器`g`で生成した乱数を代入する
- (2) : 出力イテレータ範囲`[first, last)`の各要素に、乱数生成器`g`で生成した乱数を代入する
- (3) : 出力範囲`r`の各要素に、乱数生成器`g`と分布生成器`d`で生成した乱数を代入する
- (4) : 出力イテレータ範囲`[first, last)`の各要素に、乱数生成器`g`と分布生成器`d`で生成した乱数を代入する

この関数は、`for`文を使用した以下のコードをアルゴリズム関数化したものである。

```cpp
std::vector<int> v(10);
std::mt19937 gen {std::random_device{}()};
std::uniform_int_distribution<int> dist{1, 100};

// 以下の3つのコードは等価
std::ranges::generate_random(v, gen);                  // (1)
std::ranges::generate_random(v.begin(), v.end(), gen); // (2)
for (auto& x : v) {
  x = gen();
}

// 以下の3つのコードは等価
std::ranges::generate_random(v, gen, dist);                  // (3)
std::ranges::generate_random(v.begin(), v.end(), gen, dist); // (4)
for (auto& x : v) {
  x = dist(gen);
}
```


## 効果
- (1) :
    - `g.generate_random(`[`std::forward`](/reference/utility/forward.md)`<R>(r))`が妥当な式であれば、それを呼び出す
        - 備考 : 乱数生成器が`generate_random()`メンバ関数をもっていればそれを使用する
    - そうでなく、`R`が[`sized_range`](/reference/ranges/sized_range.md)のモデルである場合、値`N`と[`span`](/reference/span/span.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<G&>, N>`型オブジェクト`s`に対して、式`g()`または`g.generate_random(s)`を未規定の回数だけ呼び出して実行し、`r`の各要素に代入する
        - 備考 : ここでの`N`は乱数生成の回数と異なってもよい
    - そうでなければ、[`ranges::generate`](/reference/algorithm/ranges_generate.md)`(`[`std::forward`](/reference/utility/forward.md)`<R>(r), ref(g))`を呼び出す
        - 備考 : [`std::forward_list`](/reference/forward_list/forward_list.md)のような`size()`メンバ関数をもたないコンテナがこちらに該当する

- (2) : 以下と等価
    ```cpp
    return generate_random(subrange<O, S>(std::move(first), last), g);
    ```
    * std::move[link /reference/utility/move.md]

- (3) :
    - `d.generate_random(`[`std::forward`](/reference/utility/forward.md)`<R>(r), g)`が妥当な式であれば、それを呼び出す
        - 備考 : 分布生成器が`generate_random()`メンバ関数をもっていればそれを使用する
    - そうでなく、`R`が[`sized_range`](/reference/ranges/sized_range.md)のモデルである場合、値`N`と[`span`](/reference/span/span.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<D&, G&>, N>`型オブジェクト`s`に対して、式[`invoke`](/reference/functional/invoke.md)`(d, g)`または`d.generate_random(s, g)`を未規定の回数だけ呼び出して実行し、`r`の各要素に代入する
        - 備考 : ここでの`N`は乱数生成の回数と異なってもよい
    - そうでなければ、[`ranges::generate`](/reference/algorithm/ranges_generate.md)`(`[`std::forward`](/reference/utility/forward.md)`<R>(r), [&d, &g] { return` [`invoke`](/reference/functional/invoke.md)`(d, g); })`を呼び出す
        - 備考 : [`std::forward_list`](/reference/forward_list/forward_list.md)のような`size()`メンバ関数をもたないコンテナがこちらに該当する

- (4) : 以下と等価
    ```cpp
    return generate_random(subrange<O, S>(std::move(first), last), g, d);
    ```
    * std::move[link /reference/utility/move.md]


## 戻り値
- (1), (3) :
    ```cpp
    return ranges::end(r);
    ```


## 例
```cpp example
#include <random>
#include <print>
#include <vector>

int main()
{
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());
  std::uniform_int_distribution<int> dist{0, 100};

  std::vector<int> v(10);

  // コンテナの全要素を乱数で埋める
  std::ranges::generate_random(v, engine);
  std::println("{}", v);

  // コンテナの全要素を、指定した分布の乱数で埋める
  std::ranges::generate_random(v, engine, dist);
  std::println("{}", v);
}
```
* std::ranges::generate_random[color ff0000]

### 出力例
```
[2034091041, 1919373608, 514210727, -1154669807, -315048337, -1224623446, -1986406128, -1034429876, -844125616, 1858136340]
[83, 25, 48, 15, 9, 60, 47, 31, 91, 54]
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 10 [mark noimpl]


## 参照
- [P1068R11 Vector API for random number generation](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1068r11.pdf)
