# allocate
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]

```cpp
pointer allocate(size_type n);                          // (1) C++17 まで
[[nodiscard]] constexpr pointer allocate(size_type n);  // (1) C++20 から

pointer allocate(size_type n,
                 allocator<void>::const_pointer hint);  // (2) C++17 から非推奨、C++20 から削除
```

## 概要
メモリを確保する。


## 戻り値
適切にアライメント配置された`n * sizeof(T)`サイズのストレージの配列の、最初の要素へのポインタを返す。  
ストレージは、[`::operator new(std::size_t)`](/reference/new/op_new.md)の呼び出しによって取得される。

この関数の呼び出し頻度やヒントの扱いは未規定。


## 例外
ストレージからのメモリ確保に失敗した場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 備考
コンテナのメンバ関数でこの関数を使用する場合には、隣接要素のアドレスをヒントとして渡すのが適している。


## 非推奨の詳細
ヒントパラメータは、ア�ケータ実装者に使われなかったため、非推奨となった。


## 例
```cpp example
#include <memory>

int main()
{
  std::allocator<int> alloc;

  // 10要素のint領域を確保する
  std::size_t n = 10;
  int* p = alloc.allocate(n);

  // 確保したメモリを解放する
  alloc.deallocate(p, n);
}
```
* allocate[color ff0000]
* alloc.deallocate[link deallocate.md]

### 出力
```
```


## 参照
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
