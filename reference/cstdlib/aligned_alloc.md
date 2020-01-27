# aligned_alloc
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  void* aligned_alloc(size_t alignment, size_t size);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
指定したアライメントでメモリを確保する。


## 事前条件
- 指定するアライメント値`alignment`は、実装がサポートしている有効なアライメント値であること
    - POSIXの実装では、2の累乗、および`sizeof(void*)`の倍数であること
- サイズ値`size`は、`alignment`の整数倍であること


## 効果
指定されたアライメントで、`size`分の不定値領域を確保する。


## 戻り値
確保した領域へのポインタを返す。

確保できなかった場合、ヌルポインタを返す。


## 例
```cpp example
#include <cstdlib>

int main()
{
  // 8バイトアライメントで、16バイトの領域を確保する
  void* p = std::aligned_alloc(8, 16);
  std::free(p);
}
```
* std::aligned_alloc[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.4
- [GCC](/implementation.md#gcc): 8.3
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3の時点では未実装)

#### 備考
- Clangは、グ�ーバル名前空間 (POSIXの実装) では、3.1で動作確認できた
- GCCは、グ�ーバル名前空間 (POSIXの実装) では、4.4で動作確認できた
- Visual Studio 2019 Update 3の時点では�在が確認できない。`_aligned_malloc`という同�のWindows用機能が提供されているため、そちらを使う必要がある

## 参照
- [`aligned_alloc`(3) - Linux man page](https://linux.die.net/man/3/aligned_alloc)
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
- [C ++ 17 std :: aligned_alloc缺失-C ++ 17 Std :: aligned_alloc欠落](https://developercommunity.visualstudio.com/content/problem/468021/c17-stdaligned-alloc%E7%BC%BA%E5%A4%B1.html)
