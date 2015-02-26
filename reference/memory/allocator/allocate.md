#allocate
* memory[meta header]
* std[meta namespace]
* allocator[meta class]

```cpp
pointer allocate(size_type n, allocator<void>::const_pointer hint = 0);
```

##概要
メモリを確保する。


##戻り値
適切にアラインメント配置された`n * sizeof(T)`サイズのストレージの配列の、最初の要素へのポインタを返す。  
ストレージは、[`::operator new(std::size_t)`](/reference/new/new.md)の呼び出しによって取得される。この関数の呼び出し頻度やヒントの扱いは未規定。


##例外
ストレージからのメモリ確保に失敗した場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


##備考
コンテナのメンバ関数でこの関数を使用する場合には、隣接要素のアドレスをヒントとして渡すのが適している。


##例
```cpp
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

###出力
```
```


