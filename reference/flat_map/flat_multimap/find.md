# find
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
iterator find(const key_type& x);             // (1) C++23

template <class K>
iterator find(const K& x);                    // (2) C++23

const_iterator find(const key_type& x) const; // (3) C++23

template <class K>
const_iterator find(const K& x) const;        // (4) C++23
```

## 概要
`x`と等価なキーの要素を検索する。

- (1), (3) : クラスのテンプレートパラメータ`key_type`型のキーを受け取って検索する。
- (2), (4) : `key_type`と比較可能な`K`型のキーを受け取って検索する。


## テンプレートパラメータ制約
- (2), (4) : `key_compare::is_transparent`が妥当な式であること


## 戻り値
- (1), (3) : `x`と等価なキーの要素が見つかった場合は、見つかった要素へのイテレータを返す。そうでない場合は、 [`end()`](end.md) を返す。
- (2), (4) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つキーを`k`として、キーが等価か判定する式`!c(k, x) && !c(x, k)`が`true`となる要素へのイテレータを返す。そのような要素がない場合は、[`end()`](end.md) を返す。
等価となる要素が複数ある場合、そのうちのいずれかの要素へのイテレータを返す。


## 計算量
[`size()`](size.md) について対数時間。


## 備考
- (2), (4) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`flat_multimap<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <flat_map>
#include <iostream>
#include <string>

int main()
{
  // (1)
  {
    std::flat_multimap<std::string, int> fm = {
      {"Alice", 3},
      {"Bob",   1},
      {"Carol", 4}
    };

    decltype(fm)::iterator it = fm.find("Bob");
    if (it != fm.end()) { // 見つかった
      std::cout << it->second << std::endl;
    }
  }

  // (2)
  {
    std::flat_multimap<std::string, int, std::less<>> fm = {
      {"Alice", 3},
      {"Bob",   1},
      {"Carol", 4}
    };

    // std::lessのvoidに対する特殊化を使用することで、
    // 文字列リテラルをfind()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    decltype(fm)::iterator it = fm.find("Bob");
    if (it != fm.end()) { // 見つかった
      std::cout << it->second << std::endl;
    }
  }
}
```
* find[color ff0000]
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
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`contains()`](contains.md)
