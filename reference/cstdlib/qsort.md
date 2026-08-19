# qsort
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void qsort(void* base,
             size_t nmemb,
             size_t size,
             c-compare-pred* compar); // (1)
  void qsort(void* base,
             size_t nmemb,
             size_t size,
             compare-pred* compar);   // (2)
}
```
* size_t[link /reference/cstddef/size_t.md]
* c-compare-pred[italic]
* compare-pred[italic]

## 概要
配列を、比較関数`compar`が定める順序に従って昇順にソートする。

`base`が指す`nmemb`個の要素 (各要素のサイズは`size`バイト) からなる配列を、その場でソートする。

説明用の型`c-compare-pred`・`compare-pred`は、それぞれ`extern "C"`・`extern "C++"`の言語リンケージを持つ比較関数`int(const void*, const void*)`へのポインタ型である。これにより、いずれの言語リンケージの比較関数も渡せる。


## 事前条件
`base`が指す配列の要素は、トリビアルにコピー可能 ([`is_trivially_copyable`](/reference/type_traits/is_trivially_copyable.md)) な型であること。

- C++20まで : トリビアルな型であること
- C++23 : トリビアルにコピー可能な型に緩和された


## 効果
`base`が指す配列の`nmemb`個の要素を、比較関数`compar`が定める順序に従って昇順にソートする。ソートは配列をその場で書き換えることによって行われる。

`compar`は任意の2要素`x`、`y`について、`x`が`y`より前に位置すべき場合に負の値を返すように、全順序と整合する必要がある。同じ配列に対する`compar`の呼び出しは、比較される要素の値のみによって一貫した結果を返さなければならない。

比較関数`compar`が同順とした（`0`を返した）要素どうしの、ソート後の相対順序は規定されない（安定ソートではない）。


## 戻り値
なし


## 比較関数
`compar`は、配列の2つの要素へのポインタを引数に取り、以下を返す関数である。

- 第1引数が第2引数より小さい場合 : 負の値
- 第1引数が第2引数と等しい場合 : `0`
- 第1引数が第2引数より大きい場合 : 正の値


## 例外
比較関数`compar`が送出した例外を送出する。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。


## 例
```cpp example
#include <cstdlib>
#include <iostream>
#include <iterator>

int compare(const void* a, const void* b)
{
  int x = *static_cast<const int*>(a);
  int y = *static_cast<const int*>(b);
  return x - y;
}

int main()
{
  int data[] = {5, 3, 9, 1, 7};

  std::qsort(data, std::size(data), sizeof(int), compare);

  for (int x : data) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::qsort[color ff0000]
* std::size[link /reference/iterator/size.md]

### 出力
```
1 3 5 7 9 
```


## バージョン
### 言語
- C++98


## 関連項目
- [`bsearch`](bsearch.md): ソート済み範囲から二分探索を行う
- [`std::sort`](/reference/algorithm/sort.md): 範囲の並べ替えを行う


## 参照
- [LWG Issue 3521. Overly strict requirements on `qsort` and `bsearch`](https://cplusplus.github.io/LWG/issue3521)
    - C++23で、配列の要素型の事前条件がトリビアルな型からトリビアルにコピー可能な型へ緩和された
