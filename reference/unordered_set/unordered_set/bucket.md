#bucket
```cpp
<pre style='margin:0'><code style='color:black'>size_type bucket(const key_type& k) const;</pre>
```

##概要

指定したキーと等価な要素が格納されている場合、そのバケットのインデックス（添え字）を返す。


##要件

当該コンテナは <code style='color:black'>[bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)() > 0</code> であること


##戻り値

引数 <code style='color:black'>k</code> と等価なキーの要素が格納されているバケットのインデックス（添え字）

戻り値は <code style='color:black'>[0, [bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)())</code> の範囲である。


##計算量

定数。


##備考

指定したキーと等価な要素が格納されていない場合、そのキーを挿入した際に <code style='color:black'>[rehash](/reference/unordered_set/unordered_set/rehash.md)</code> が発生しなければ格納されるバケットのインデックス（添え字）が返る。


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <string>
#include <unordered_set>

int main()
{
  std::unordered_set<std::string> us{ "A", "B", "C", "D", "E", };

  decltype(us)::size_type c = us.bucket_count();
  std::cout << "bucket_count() = " << c << std::endl;

  // 全てのキーに対するバケットのインデックスとそのバケットの要素数を取得
  for (decltype(us)::key_type k : us) {
    decltype(us)::size_type b = us.bucket(k);
    decltype(us)::size_type s = us.bucket_size(b);
    std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
  }

  // 存在しないキーに対するバケットのインデックスとそのバケットの要素数を取得
  decltype(us)::key_type k = "H";
  decltype(us)::size_type b = us.bucket(k);
  decltype(us)::size_type s = us.bucket_size(b);
  std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
}
</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* string[link /reference/string.md]
* unordered_set[link /reference/unordered_set.md]
* bucket_count[link /reference/unordered_set/unordered_set/bucket_count.md]
* bucket_size[link /reference/unordered_set/unordered_set/bucket_size.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>bucket_count() = 5
key = E, bucket = 0, bucket_size = 1
key = D, bucket = 1, bucket_size = 1
key = C, bucket = 4, bucket_size = 2
key = B, bucket = 4, bucket_size = 2
key = A, bucket = 3, bucket_size = 1
key = H, bucket = 2, bucket_size = 0</pre>
```

##バージョン


###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): -

- [Clang, C++0x mode](/implementation#clang.md): 3.1

- [GCC](/implementation#gcc.md): -

- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2

- [ICC](/implementation#icc.md): ?

- [Visual C++:](/implementation#visual_cpp.md) ?

##参照


| | |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
|<code style='color:black'>[max_bucket_count](/reference/unordered_set/unordered_set/max_bucket_count.md)</code> |最大バケット数の取得 |
