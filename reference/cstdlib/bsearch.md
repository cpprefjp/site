# bsearch
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void*
    bsearch(const void* key,
            void* base,
            size_t nmemb,
            size_t size,
            c-compare-pred* compar); // (1)
  void*
    bsearch(const void* key,
            void* base,
            size_t nmemb,
            size_t size,
            compare-pred* compar);   // (2)

  const void*
    bsearch(const void* key,
            const void* base,
            size_t nmemb,
            size_t size,
            c-compare-pred* compar); // (3) C++26
  const void*
    bsearch(const void* key,
            const void* base,
            size_t nmemb,
            size_t size,
            compare-pred* compar);   // (4) C++26
}
```
* size_t[link /reference/cstddef/size_t.md]
* c-compare-pred[italic]
* compare-pred[italic]

## 概要
ソート済みの配列に対して二分探索を行う。

`base`が指す`nmemb`個の要素 (各要素のサイズは`size`バイト) からなる配列を、比較関数`compar`を用いて二分探索し、`key`が指す値と一致する要素を検索する。

説明用の型`c-compare-pred`・`compare-pred`は、それぞれ`extern "C"`・`extern "C++"`の言語リンケージを持つ比較関数`int(const void*, const void*)`へのポインタ型である。これにより、いずれの言語リンケージの比較関数も渡せる。


## 戻り値
一致する要素が見つかった場合、その要素へのポインタを返す。一致する要素が複数ある場合、いずれが返されるかは未規定である。

一致する要素が見つからなかった場合、ヌルポインタを返す。

- (1), (2) : `base`が指す配列の要素へのポインタを`void*`型で返す
- (3), (4) : `base`が指す配列の要素へのポインタを`const void*`型で返す


## 比較関数
`compar`は、第1引数に`key`、第2引数に配列の要素を受け取り、以下を返す関数である。

- `key`が要素より小さい場合 : 負の値
- `key`が要素と等しい場合 : `0`
- `key`が要素より大きい場合 : 正の値

配列は、この比較関数の順序に従って昇順にソートされていなければならない。


## 備考
- C++26では、`const`修飾を保持するオーバーロード (3), (4) が追加された。これにより、`const`な配列を探索した結果として`const void*`が返るようになり、`const`な配列の要素を結果経由で書き換えてしまう不適切なコードを防げる
    - 同時に、非`const`の配列を受け取る(1), (2)は引数`base`が`void*`となり、非`const`なポインタを返す


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
  const int data[] = {1, 3, 5, 7, 9};
  int key = 5;

  // constな配列を探索すると、C++26ではconst int*が得られる
  const int* p = static_cast<const int*>(
    std::bsearch(&key, data, std::size(data), sizeof(int), compare));

  if (p != nullptr) {
    std::cout << "found: " << *p << std::endl;
  }
}
```
* std::bsearch[color ff0000]
* std::size[link /reference/iterator/size.md]

### 出力
```
found: 5
```


## バージョン
### 言語
- C++98
- C++26: `const`を保持するオーバーロード (3), (4) を追加


## 関連項目
- `qsort`: 範囲の並べ替えを行う
- [`std::lower_bound`](/reference/algorithm/lower_bound.md): ソート済み範囲から二分探索を行う


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26で`const`を保持するオーバーロードが追加された
