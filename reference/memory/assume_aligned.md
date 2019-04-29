# assume_aligned

* memory[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]


```cpp
template<size_t N, class T>
[[nodiscard]] constexpr T* assume_aligned(T* ptr);
```

## 概要

特定のメモリー領域のアライメント情報をプログラマーが明示的にコンパイラーへ与えコンパイラーが最適化のヒントとして活用できるようにする。

## 効果

本機能の効果はコンパイラーの対象メモリー領域に対する機械語の生成と最適化の選択として現れる。適切に使用した場合はプログラムの実行結果そのものについて効果を持つ事はないが、より高度な最適化が施され、生成されるプログラムの動作速度やフットプリントに良好な効果を及ぼす可能性が得られる。但し、例で示す様に不適切な使用があった場合にはコンパイラーが不正な機械語の選択を行い実行不能なプログラムを生成する可能性も生じる。

## 戻り値

引数 `ptr` がそのまま得られる。（この関数の意義については「効果」を参照されたい。）

## 備考

この機能によって引数または戻り値として得られるメモリー領域が変化する事はない。アライメント不定のメモリー領域を本機能へ渡してもアライメントされたメモリー領域を得られるわけではない。アライメントされたメモリー領域を得たい場合には、先ず `alisnas` を参照すると良い。

## 例

はじめに、ごく単純な使用例のみを示す。但し、 `assume_aligned` の効果はソースコード上の記述と実行結果だけでは分かりにくいため、後にもう1つ、 `assume_aligned` の効果をより具体的に解説する例も示す。

### 例1: ごく単純な仕様例

```cpp example
#include <memory>
#include <new>
#include <cstdint>
#include <iostream>

// 例えば翻訳単位が異なる、あるいは他人の作成した仕様はドキュメントでわかるが
// ソースコードは不明な実行時にリンクするどこかのライブラリーがあるとしよう。
namespace external_library
{
  static char* memory_pool = nullptr;
  
  // そのライブラリーの中で仕様上は領域全体としては 16-byte アライメントされた
  // 4 つ連続した float 型の領域を return してくれる関数があったとしよう。
  float* get_data()
  {
    if ( memory_pool == nullptr )
      memory_pool = new char[ 32 ];
    
    static_assert( sizeof( decltype( memory_pool ) ) == 8 );
    
    // 特に、このような実装でアライメントの仕様を満たしていた場合には
    // 翻訳単位が異なれば、呼び出し元を翻訳するコンパイラーはそれを知るのは難しい。
    auto data = (float*)( ( (std::uint64_t)memory_pool + 0x0f ) >> 4 << 4 );
    
    for ( auto n = 0; n < 4; ++n )
      data[ n ] = n;
    
    return data;
  }
}

int main()
{
  // しかし、それを使用するコードのコンパイル時点では、
  // コンパイラーは外部ライブラリ－によって確保されるメモリー領域が
  // アライメントされている事はわからないとしよう。
  auto data = external_library::get_data();
  
  // そこで、 assume_aligned を使い、ソースコードでプログラマーが明示的に
  // 特定のメモリー領域のアライメントをコンパイラーへ伝える。
  auto aligned_data = std::assume_aligned< 16 >( data );
  
  // コンパイラーが十分に賢く最適化できるならば、
  // assume_aligned のヒント付けにより次のコードは
  // 16-byte アライメントされた連続した4つの float 領域として、
  // 例えば SSE 命令を用いた最適化により movaps と mulps 命令により
  // ループも排除した単純で高速な機械語を生成してくれるかもしれない。
  // （ assume_aligned はヒント付けでしかないので、どこまでヒントを活かしてくれるかは
  // コンパイラーによって結果は異なるし、まったく最適化に役立ててくれないコンパイラーもあるかもしれません。 ）
  for ( auto n = 0; n < 4; ++n )
    aligned_data[ n ] *= aligned_data[ n ];
  
  // （実行結果が見れないと寂しいので付けたが、 assume_aligned の例としてはこの部分に意味はない。）
  for ( auto n = 0; n < 4; ++n )
    std::cout << "data[ " << n << " ] = " << data[ n ] << '\n';
}

```

#### 出力

次に示す出力は期待動作を示すものではあるが、残念ながら `assume_aligned` の効果については読み取れない。

```sh
data[ 0 ] = 0
data[ 1 ] = 1
data[ 2 ] = 4
data[ 3 ] = 9
```

### 例2: 効果をより具体的に解説する例

このソースコードでは x86 系の近年の CPU では一般的に使用可能となっている SSE 命令セットから `float` を 4 つ同時に扱う命令が使用可能な環境を想定し、

1. コンパイラーが操作対象のメモリー領域のアライメントに基づく最適化の可否を十分に判断できる場合、
2. 十分には判断できない場合、
3. 十分には判断できなくともソースコード上に `assume_aligned` （または相当するコンパイラーの独自実装機能）を用いてプログラマーが明示的にアライメントをコンパイラーへ指示した場合

について `define` により選択的にコンパイルできるようにした。

この例2ではソースコードの後に通常の「出力」に代えて、 `assume_aligned` の効果を確認するため「逆アセンブル」の一部を示す。

```cpp example
#include <iostream>
#include <numeric>
#include <xmmintrin.h>

//#define MEMORY_ALLOCATE_ABNORMAL_ALIGNMENT
//#define ASSUME_ALIGN_CPP20
//#define ASSUME_ALIGN_GCC_OR_CLANG
//#define ASSUME_ALIGN_ICC

template <typename T, std::size_t size, std::size_t alignment>
struct alignas(alignment) aligned_pack
{ T data[size]; };

using SSE_SINGLE_TYPE = float;
constexpr auto SSE_SINGLE_PACKING = 4;
constexpr auto SSE_ALIGNMENT = 16;

using f32x4 = 
  aligned_pack
  < SSE_SINGLE_TYPE
  , SSE_SINGLE_PACKING
  , SSE_ALIGNMENT
  >;

int main()
{
  constexpr auto N = 256;

#ifdef MEMORY_ALLOCATE_ABNORMAL_ALIGNMENT
  // A アラインで float 要素を N + 1 個の配列を確保するが、
  // わざと 1-byte だけアドレスをずらした実験用の data 領域を定義
  alignas( SSE_ALIGNMENT ) f32x4 memory_pool[ N + 1 ];
  f32x4* packs =  (f32x4*)( (char*)&memory_pool[ 0 ] + 1 );
#else
  // 素直に A アラインで float 要素を N 個の配列を定義
  alignas( SSE_ALIGNMENT ) f32x4 packs[ N ];
#endif
  
  std::fill( &packs[ 0 ].data[ 0 ], &packs[ N ].data[ 0 ], 1.0f );

  for ( auto n = 0; n < N; ++n )
  {
    auto& pack = packs[ n ];
    auto xmm =
#ifdef ASSUME_ALING_CPP20
      _mm_load_ps( std::assume_aligned< SSE_ALIGNMENT >( pack.data ) );
#elif defined( ASSUME_ALIGN_GCC_OR_CLANG )
      _mm_load_ps( (float*)__builtin_assume_aligned( pack.data, SSE_ALIGNMENT ) );
#elif defined( ASSUME_ALIGN_ICC )
      _mm_load_ups( (float*)__assume_aligned( pack.data, SSE_ALIGNMENT ) );
#else
      _mm_load_ps( pack.data );
#endif

    xmm = _mm_add_ps( xmm, xmm );
    _mm_store_ps( pack.data, xmm );
  }

  std::cout << std::accumulate( &packs[ 0 ].data[ 0 ], &packs[ N ].data[ 0 ], 0.0f );
}
```

### 逆アセンブル

執筆現在は正式にリリースされた `GCC`, `Clang`, `ICC`, `MSVC++` などの主要なツールチェインではまだ `assume_aligned` の正式なサポートは未完了のため `assume_aligned` に代えて `GCC` および `Clang` において等価な挙動を示す独自拡張 `__builtin_assume_aligned` を用いた場合にコンパイラーが生成するコードの最適化効果を `GCC-8.3`, `-O2` での実行結果を元に示す。

#### 2.a. 何れの `define` も使用しなかった場合

この場合、コンパイラーは `packs` が `alignas` により 16-byte アライメントを指示された事を知っている。このため、`_mm_load_ps` の部分は `.L3` ラベルのすぐ後で `movaps` として現れている。 `_mm_load_ps` は仕様上の直接の対応としては `movaps` だが、実際はコンパイラーによって `movups` が適切と判断され使用される場合もある。また、 `_mm_loadu_ps` をコードしていた場合でも `movups` ではなく `movaps` へ最適化される場合もある。

つまり、この場合の逆アセンブルからは `alignas` により 16-byte アライメントで `packs` のメモリー領域が確保されているから、 XMM レジスターへの読み出し命令はアライメント不明でも使用可能な代わりに僅かに速度的に不利となる可能性のある `movups` ではなく 16-byte アライメントされたメモリー領域を前提とする代わりに僅かに速度的に有利となる可能性のある `movaps` が採用される状態となっている事が分かる。

```asm
main:
        sub     rsp, 4104
        movss   xmm0, DWORD PTR .LC1[rip]
        mov     rax, rsp
.L2:
        movss   DWORD PTR [rax], xmm0
        lea     rcx, [rsp+4096]
        add     rax, 4
        cmp     rax, rcx
        jne     .L2
        mov     rax, rsp
        mov     rdx, rcx
.L3:
        movaps  xmm0, XMMWORD PTR [rax]
        add     rax, 16
        addps   xmm0, xmm0
        movaps  XMMWORD PTR [rax-16], xmm0
        cmp     rax, rdx
        jne     .L3
        pxor    xmm0, xmm0
        mov     rax, rsp
.L4:
        addss   xmm0, DWORD PTR [rax]
        lea     rsi, [rsp+4096]
        add     rax, 4
        cmp     rax, rsi
        jne     .L4
        mov     edi, OFFSET FLAT:_ZSt4cout
        cvtss2sd        xmm0, xmm0
        call    std::basic_ostream<char, std::char_traits<char> >& std::basic_ostream<char, std::char_traits<char> >::_M_insert<double>(double)
        xor     eax, eax
        add     rsp, 4104
        ret
_GLOBAL__sub_I_main:
        sub     rsp, 8
        mov     edi, OFFSET FLAT:_ZStL8__ioinit
        call    std::ios_base::Init::Init() [complete object constructor]
        mov     edx, OFFSET FLAT:__dso_handle
        mov     esi, OFFSET FLAT:_ZStL8__ioinit
        mov     edi, OFFSET FLAT:_ZNSt8ios_base4InitD1Ev
        add     rsp, 8
        jmp     __cxa_atexit
.LC1:
        .long   1065353216
```

#### 2.b. `MEMORY_ALLOCATE_ABNORMAL_ALIGNMENT` のみ定義した場合

この場合、 `packs` は故意に 16-byte アライメントから 1 byte だけずれたメモリー領域となる。すると、 `.L3` の部分で `_mm_load_ps` は `movups` へ翻訳されるようになる。

今回はコンパイラーが packs が 16-byte アライメントされていない可能性を検知した事により `movaps` ではなく `movups` が安全に採用されている。

```asm
.L3:
        movups  xmm0, XMMWORD PTR [rax]
        add     rax, 16
        addps   xmm0, xmm0
        movups  XMMWORD PTR [rax-16], xmm0
        cmp     rdx, rax
        jne     .L3
        pxor    xmm0, xmm0
        lea     rax, [rsp+1]
        lea     rdx, [rsp+4097]
```

#### 2.c. `MEMORY_ALLOCATE_ABNORMAL_ALIGNMENT` と `ASSUME_ALIGN_CPP20` または `ASSUME_ALIGN_GCC_OR_CLANG` を定義した場合

この場合、 `assume_aligned` または `__builtin_assume_aligned` によるプログラマーからの明示的なヒント付けにより、コンパイラーはプログラマーからの情報を信じて `packs` の要素が 16-byte アライメントされたメモリー領域であり、その領域が `_mm_load_ps` の実引数として渡されていると判断して翻訳を行う。結果、コンパイラーは `_mm_load_ps` を 2.b. の `movups` ではなく `movaps` へと翻訳する。

```asm
.L3:
        movaps  xmm0, XMMWORD PTR [rax]
        add     rax, 16
        addps   xmm0, xmm0
        movups  XMMWORD PTR [rax-16], xmm0
        cmp     rax, rdx
        jne     .L3
        pxor    xmm0, xmm0
        lea     rax, [rsp+1]
        lea     rdx, [rsp+4097]
```

なお、この例は逆アセンブルから `assume_aligned` の効果を確認するために用意し、その意味ではコンパイラーは期待動作してくれるが、この 2.c. から生成される実行バイナリーを実行した場合、出力は得られずプログラムは `segmentation fault` して OS に実行を停止させられてしまう。 16-byte アライメントされたメモリー領域を前提とした `movaps` を、その前提を確実に満たさないメモリー領域に対して実行する実行プログラムとしては不正な機械語が生成されるため生じる。

例え故意でなくとも `assume_aligned` を不適切に用いてしまうと、この様にプログラムは期待動作し得ない実行バイナリーを生成してしまう可能性も十分にあるため、使用にあたっては必要性、妥当性について十分に注意すると良い。

## 実装例
```cpp
#include <cstddef>
#include <cstdint>

template < std::size_t N, typename T >
#if defined( __clang__ ) || defined( __GNUC__ )
  __attribute__( ( always_inline ) )
#elif defined( _MSC_VER )
  __forceinline
#endif
[[ nodiscard ]] constexpr T* assume_aligned( T* ptr )
{
#if defined( __clang__ ) || ( defined( __GNUC__ ) && !defined( __ICC ) )
  return reinterpret_cast< T* >( __builtin_assume_aligned( ptr, N ) );
#elif defined(_MSC_VER)
  if ( ( reinterpret_cast< std::uintptr_t >( ptr ) & ( ( 1 << N ) - 1 ) ) == 0 )
    return ptr;
  else
    __assume( 0 );
#elif defined( __ICC )
  switch ( N )
  {
    case 2: __assume_aligned( ptr, 2 ); break;
    case 4: __assume_aligned( ptr, 4 ); break;
    case 8: __assume_aligned( ptr, 8 ); break;
    case 16: __assume_aligned( ptr, 16 ); break;
    case 32: __assume_aligned( ptr, 32 ); break;
    case 64: __assume_aligned( ptr, 64 ); break;
    case 128: __assume_aligned( ptr, 128 ); break;
  }
  return ptr;
#else
  // Unknown compiler — do nothing
  return ptr;
#endif
}
```

## バージョン

### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): †
- [GCC](/implementation.md#gcc): † ‡
- [ICC](/implementation.md#icc): †
- [Visual C++](/implementation.md#visual_cpp): †

†2019-04-29 時点で正式リリース版の対応はまだ無い。処理系独自拡張による等価な実装はあり。
‡2019-04-29 時点で `GCC-10.0.0 20190426 (experimental)` では使用可能を確認。

（本項は初稿時点では処理系の対応がまだ進んでいないため、各処理系の対応情報が明らかとなり記述の更新が求められる。）

### 備考

C++20 から標準で使用可能となる本機能だが、実装例からも分かるように `GCC` や `Clang` には等価な独自拡張での実装が以前から存在する。例えば `__builtin_assume_aligned` は `GCC-4.7` 以降, `Clang-3.6` 以降から使用可能だった。

## 関連項目

- [alignas](lang/cpp11/alignas.md)
- [alignof](lang/cpp11/alignof.md)

## 参照

- [P1007R3 std::assume_aligned](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1007r3.pdf)
- [cppmap - C++20 の新機能 - ポインタのアライメントを最適化ヒントとしてコンパイラに伝える assume_aligned() 関数 (P1007R3)](https://cppmap.github.io/standardization/cpp20/#assume_aligned-p1007r3)
