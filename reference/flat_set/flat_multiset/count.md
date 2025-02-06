# count
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
size_type count(const key_type& x) const; // (1) C++23

template <class K>
size_type count(const K& x) const;        // (2) C++23
```

## 概要
キー `x` を検索し、コンテナ内に見つかった要素の数を返す。

- (1) : クラスのテンプレートパラメータ`key_type`型のキー `x` を受け取って、`x` と等価なキーを持つ要素の数を取得する。
- (2) : `key_type`と比較可能な`K`型のキー `x` を受け取って、`x`と等価なキーを持つ要素の数を取得する。


## テンプレートパラメータ制約
- (2) : `key_compare::is_transparent`が妥当な式であること


## 戻り値
- (1) : `x`と等価なキーの要素数を返す。
- (2) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つキーを`k`として、キーが等価か判定する式`!c(k, x) && !c(x, k)`が`true`となる要素の数を返す。


## 計算量
```
log(size()) + count(x)
```
* size()[link size.md]


## 備考
- (2) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`flat_multiset<string>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <flat_set>
#include <iostream>
#include <string>

int main()
{
  // (1)
  {
    std::flat_multiset<std::string> fs = {"Alice", "Bob", "Carol"};

    std::cout << fs.count("Bob") << std::endl;
  }

  // (2)
  {
    std::flat_multiset<std::string, std::less<>> fs = {"Alice", "Bob", "Carol"};

    // std::lessのvoidに対する特殊化を使用することで、
    // 文字列リテラルをcount()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    std::cout << fs.count("Bob") << std::endl;
  }
}
```
* fs.count[color ff0000]
* std::less[link /reference/functional/less.md]

### 出力
```
1
1
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`contains()`](contains.md)
