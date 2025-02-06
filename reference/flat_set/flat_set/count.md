# count
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
size_type count(const key_type& x) const; // (1) C++23

template <class K>
size_type count(const K& x) const;        // (2) C++23
```

## 概要
キー `x` を検索し、コンテナ内に見つかった要素の数を返す。`flat_set` コンテナはキーの重複を許さないため、この関数は実際には要素が見つかったときに 1 を、そうでないときに 0 を返す。

- (1) : クラスのテンプレートパラメータ`key_type`型のキーを受け取る
- (2) : `key_type`と比較可能な`K`型のキーを受け取る


## テンプレートパラメータ制約
- (2) : `key_compare::is_transparent`が妥当な式であること


## 戻り値
- (1) : `x`と等価なキーの要素が見つかった場合は1、そうでない場合は0を返す。
- (2) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つキーを`k`として、キーが等価か判定する式`!c(k, x) && !c(x, k)`が`true`となる要素が見つかった場合は1、そうでない場合は0を返す。


## 計算量
```
log(size()) + count(x)
```
* size()[link size.md]


## 備考
- (2) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`flat_set<string>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。
- [`std::flat_multiset`](/reference/flat_set/flat_multiset.md)クラスとの共通インタフェースを使用する必要がなければ、この関数の代わりに[`contains()`](contains.md)メンバ関数を使用することを推奨する


## 例
```cpp example
#include <flat_set>
#include <iostream>
#include <string>

int main()
{
  // (1)
  {
    std::flat_set<std::string> fs = {"Alice", "Bob", "Carol"};

    std::size_t n = fs.count("Bob");
    if (n > 0) { // 見つかった
      std::cout << "found" << std::endl;
    }
  }

  // (2)
  {
    std::flat_set<std::string, std::less<>> fs = {"Alice", "Bob", "Carol"};

    // std::lessのvoidに対する特殊化を使用することで、
    // 文字列リテラルをcount()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    std::size_t n = fs.count("Bob");
    if (n > 0) { // 見つかった
      std::cout << "found" << std::endl;
    }
  }
}
```
* fs.count[color ff0000]
* std::less[link /reference/functional/less.md]

### 出力
```
found
found
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
