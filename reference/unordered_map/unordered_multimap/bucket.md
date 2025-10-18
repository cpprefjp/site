# bucket
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type bucket(const key_type& k) const; // (1) C++26

template <class K>
size_type bucket(const K& k) const;        // (2) C++26
```

## 概要
指定したキーと等価な要素が格納されている場合、そのバケットのインデックス（添え字）を取得する。

- (1) : `key_type`型のキーを受け取って、バケットのインデックスを取得する
- (2) : `key_type`と比較可能なキーを受け取って、バケットのインデックスを取得する


## テンプレートパラメータ制約
- (2) : `key_compare::is_transparent` が妥当な式であること


## 事前条件
当該コンテナは [`bucket_count`](bucket_count.md)`() > 0` であること


## 戻り値
パラメータ `k` と等価なキーの要素が格納されているバケットのインデックス（添え字）


## 事後条件
戻り値は `[0,` [`bucket_count`](bucket_count.md)`())` の範囲である。


## 計算量
定数。


## 備考
- 指定したキーと等価な要素が格納されていない場合、そのキーを挿入した際に [`rehash`](rehash.md) が発生しなければ格納されるバケットのインデックス（添え字）が返る。
- (2) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_multimap<char, int> um = {
    {'A', 1},
    {'B', 2},
    {'C', 3},
    {'D', 4},
    {'E', 5}
  };

  decltype(um)::size_type c = um.bucket_count();
  std::cout << "bucket_count() = " << c << std::endl;

  // 全てのキーに対するバケットのインデックスとそのバケットの要素数を取得
  for (decltype(um)::const_reference x : um) {
    decltype(um)::key_type k = x.first;
    decltype(um)::size_type b = um.bucket(k);
    decltype(um)::size_type s = um.bucket_size(b);
    std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
  }

  // 存在しないキーに対するバケットのインデックスとそのバケットの要素数を取得
  decltype(um)::key_type k = 'H';
  decltype(um)::size_type b = um.bucket(k);
  decltype(um)::size_type s = um.bucket_size(b);
  std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
}
```
* bucket[color ff0000]
* um.bucket_count()[link bucket_count.md]
* um.bucket_size[link bucket_size.md]

### 出力例
```
bucket_count() = 11
key = E, bucket = 3, bucket_size = 1
key = A, bucket = 10, bucket_size = 1
key = B, bucket = 0, bucket_size = 1
key = C, bucket = 1, bucket_size = 1
key = D, bucket = 2, bucket_size = 1
key = H, bucket = 6, bucket_size = 0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++:](/implementation.md#visual_cpp) ?

## 関連項目

| 名前 | 説明 |
|---------------------------------------------|----------------------|
| [`max_bucket_count`](max_bucket_count.md) | 最大バケット数の取得 |

## 参照
- [P2363R5 Extending associative containers with the remaining heterogeneous overloads](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2363r5.html)
    - C++26で`template <class K>`のバージョンが追加された
