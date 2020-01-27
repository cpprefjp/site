# bucket
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type bucket(const key_type& k) const;
```

## 概要
指定した�ーと�価な要素が格納されている場合、そのバケットのインデックス（添え�）を取得する。


## 要件
当該コンテナは [`bucket_count`](bucket_count.md)`() > 0` であること


## 戻り値
パラメータ `k` と�価な�ーの要素が格納されているバケットのインデックス（添え�）

戻り値は `[0,` [`bucket_count`](bucket_count.md)`())` の範囲である。


## 計算量
定数。


## 備考
指定した�ーと�価な要素が格納されていない場合、その�ーを挿入した際に [`rehash`](rehash.md) が発生しなければ格納されるバケットのインデックス（添え�）が返る。


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<char, int> um = {
    {'A', 1},
    {'B', 2},
    {'C', 3},
    {'D', 4},
    {'E', 5}
  };

  decltype(um)::size_type c = um.bucket_count();
  std::cout << "bucket_count() = " << c << std::endl;

  // 全ての�ーに対するバケットのインデックスとそのバケットの要素数を取得
  for (decltype(um)::const_reference x : um) {
    decltype(um)::key_type k = x.first;
    decltype(um)::size_type b = um.bucket(k);
    decltype(um)::size_type s = um.bucket_size(b);
    std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
  }

  // �在しない�ーに対するバケットのインデックスとそのバケットの要素数を取得
  decltype(um)::key_type k = 'H';
  decltype(um)::size_type b = um.bucket(k);
  decltype(um)::size_type s = um.bucket_size(b);
  std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
}
```
* bucket[color ff0000]
* um.bucket_count()[link bucket_count.md]
* um.bucket_size[link bucket_size.md]

### 出力
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
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ?
- [Visual C++:](/implementation.md#visual_cpp) ?

## 関連項目

| 名前 | 説明 |
|---------------------------------------------|----------------------|
| [`max_bucket_count`](max_bucket_count.md) | 最大バケット数の取得 |

