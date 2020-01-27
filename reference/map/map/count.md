# count
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
size_type count(const key_type& x) const; // (1)

template <class K>
size_type count(const K& x) const;        // (2) C++14
```

## 概要
�ー `x` を検索し、コンテナ内に見つかった要素の数を返す。`map` コンテナは�ーの重複を許さないため、この関数は実際には要素が見つかったときに 1 を、そうでないときに 0 を返す。

- (1) : クラスのテンプレートパラメータ`key_type`型の�ーを受け取って、`x`と�価な�ーを持つ要素の数を取得する。
- (2) : `key_type`と比較可能な`K`型の�ーを受け取って、`x`と�価な�ーを持つ要素の数を取得する。


## 戻り値
- (1) : `x`と�価な�ーの要素が見つかった場合は1、そうでない場合は0を返す。
- (2) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つ�ーを`k`として、�ーが�価か判定する式`!c(k, x) && !c(x, k)`が`true`となる要素が見つかった場合は1、そうでない場合は0を返す。


## 計算量
```
log(b.size()) + b.count(k)
```
* b.size()[link size.md]


## 備考
- (2) : この関数がオーバー�ード解決に参加する条件は、[`find()`](find.md)メンバ関数の備考欄を参照。


## 例
```cpp example
#include <iostream>
#include <map>
#include <string>

int main()
{
  // (1)
  {
    std::map<std::string, int> m = {
      {"Alice", 3},
      {"Bob",   1},
      {"Carol", 4}
    };

    std::size_t n = m.count("Bob");
    if (n > 0) { // 見つかった
      std::cout << "found" << std::endl;
    }
  }

  // (2)
  {
    std::map<std::string, int, std::less<>> m = {
      {"Alice", 3},
      {"Bob",   1},
      {"Carol", 4}
    };

    // std::lessのvoidに対する特殊化を使用することで、
    // 文�列リテラルをcount()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    std::size_t n = m.count("Bob");
    if (n > 0) { // 見つかった
      std::cout << "found" << std::endl;
    }
  }
}
```
* count()[color ff0000]
* std::less[link /reference/functional/less.md]

### 出力
```
found
found
```

## 関連項目

| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`map::find`](/reference/map/map/find.md) | 指定した�ーで要素を探す |
| [`map::size`](/reference/map/map/size.md) | 要素数を取得する |
| [`map::lower_bound`](/reference/map/map/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`map::upper_bound`](/reference/map/map/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |

## 参照
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)

