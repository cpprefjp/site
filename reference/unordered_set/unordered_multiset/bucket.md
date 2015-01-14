#bucket (C++11)
```cpp
size_type bucket(const key_type& k) const;
```

##概要
指定したキーと等価な要素が格納されている場合、そのバケットのインデックス（添え字）を取得する。


##要件
当該コンテナは [`bucket_count`](./bucket_count.md)`() > 0` であること


##戻り値
パラメータ `k` と等価なキーの要素が格納されているバケットのインデックス（添え字）

戻り値は `[0, `[`bucket_count`](./bucket_count.md)`())` の範囲である。


##計算量
定数。


##備考
指定したキーと等価な要素が格納されていない場合、そのキーを挿入した際に [`rehash`](./rehash.md) が発生しなければ格納されるバケットのインデックス（添え字）が返る。


##例
```cpp
#include <iostream>
#include <string>
#include <unordered_set>

int main()
{
  std::unordered_multiset<std::string> um{ "A", "B", "C", "D", "E", "A", "B", "C", "D", "E", };

  decltype(um)::size_type c = um.bucket_count();
  std::cout << "bucket_count() = " << c << std::endl;

  // 全てのキーに対するバケットのインデックスとそのバケットの要素数を取得
  for (decltype(um)::key_type k : um) {
    decltype(um)::size_type b = um.bucket(k);
    decltype(um)::size_type s = um.bucket_size(b);
    std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
  }

  // 存在しないキーに対するバケットのインデックスとそのバケットの要素数を取得
  decltype(um)::key_type k = "H";
  decltype(um)::size_type b = um.bucket(k);
  decltype(um)::size_type s = um.bucket_size(b);
  std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
}
```
* iostream[link /reference/iostream]
* string[link /reference/string.md]
* unordered_set[link /reference/unordered_set.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset.md]
* bucket_count[link /reference/unordered_set/unordered_multiset/bucket_count.md]
* bucket_size[link /reference/unordered_set/unordered_multiset/bucket_size.md]

###出力
```
bucket_count() = 11
key = E, bucket = 6, bucket_size = 2
key = E, bucket = 6, bucket_size = 2
key = A, bucket = 5, bucket_size = 6
key = A, bucket = 5, bucket_size = 6
key = C, bucket = 5, bucket_size = 6
key = C, bucket = 5, bucket_size = 6
key = D, bucket = 5, bucket_size = 6
key = D, bucket = 5, bucket_size = 6
key = B, bucket = 7, bucket_size = 2
key = B, bucket = 7, bucket_size = 2
key = H, bucket = 3, bucket_size = 0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ?
- [Visual C++:](/implementation.md#visual_cpp) ?

##参照

| | |
|----------------------------------------------|----------------------|
| [`max_bucket_count`](./max_bucket_count.md)` | 最大バケット数の取得 |

