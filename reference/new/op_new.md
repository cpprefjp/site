#operator new
* new[meta header]
* function[meta id-type]

```cpp
// 単純な記憶域の確保
void* operator new(std::size_t size) throw(std::bad_alloc);				// (1) C++03 まで
void* operator new(std::size_t size);									// (1) C++11 から

// 単純な記憶域の確保（例外をスローしない）
void* operator new(std::size_t size, const std::nothrow_t&) throw();	// (2) C++03 まで
void* operator new(std::size_t size, const std::nothrow_t&) noexcept;	// (2) C++11 から

// 配置newによる記憶域の確保
void* operator new(std::size_t size, void* ptr) throw();				// (3) C++03 まで
void* operator new(std::size_t size, void* ptr) noexcept;				// (3) C++11 から
```
* bad_alloc[link bad_alloc.md]
* nothrow_t[link nothrow_t.md]


##概要
単一オブジェクトのために動的に記憶域を確保する。


##効果
- (1) `size` で指定したサイズ（バイト）の記憶域を確保する。  
	確保された記憶域の先頭アドレスは、`size` バイトのあらゆるオブジェクトのアラインメント要求を満たしている。  
	確保に失敗した場合、[`bad_alloc`](bad_alloc.md) 例外をスローする。
- (2) `size` で指定したサイズ（バイト）記憶域を確保する。  
	確保された記憶域の先頭アドレスは、`size` バイトのあらゆるオブジェクトのアラインメント要求を満たしている。  
	確保に失敗した場合でも例外をスローしない。
- (3) 何もしない。


##戻り値
- (1) 確保した記憶域の先頭アドレスを指すポインタ。
- (2) 記憶域を確保できた場合、確保した記憶域の先頭アドレスを指すポインタ。  
	確保できなかった場合、ヌルポインタ。
- (3) 引数 `ptr`


##備考
- (1)、および、(2) の形式は、`size` が `0` でも他の確保済みの記憶域と異なるアドレスを返す。  
	ただし、記憶域の確保に失敗する可能性もあり、また、成功しても当該ポインタを間接参照した場合の結果は未定義である。

- (1)、および、(2) の形式は、利用者がこれらとおなじシグネチャの関数を用意することで、標準ライブラリの提供している関数を置き換えることができる。  
	なお、(3) の形式については、置き換えることはできない（許可されていない）。

- (1) の形式の `operator new` を呼び出すだけであれば、（`new` 式から間接的に呼ばれる場合も含めて）`new` ヘッダをインクルードする必要はない。

- (1) の形式の詳細な正確な挙動は以下の通りである。
	- `size` で指定したサイズ（バイト）の記憶域を確保しようとする。なお、記憶域の確保に C 言語のライブラリ関数 `malloc` を用いるか否かは規定されていない。
	- もし、記憶域を確保できた場合、確保した先頭アドレスを返す。
	- もし、確保できなかった場合、
		- 現在の [`new_handler`](new_handler.md) が ヌルポインタであれば、[`bad_alloc`](bad_alloc.md) 例外をスローする。
		- 現在の [`new_handler`](new_handler.md) が ヌルポインタでなければ、当該関数を呼び出した後、最初に戻って記憶域の確保から再試行する（ループする）。

		なお、[`new_handler`](new_handler.md) は [`bad_alloc`](bad_alloc.md) 例外をスローしたり、呼び出し元に戻らなかったりすることがあるので注意。

- (2) の形式の詳細な正確な挙動は、以下の通り C++03 までと C++11 以降で異なる。
	- C++03 までの場合、(1) の形式とほぼ同様の処理を行うが、記憶域が確保できなかったり、現在の [`new_handler`](new_handler.md) が[`bad_alloc`](bad_alloc.md) 例外をスローしたりした場合には、ヌルポインタを返す。
	- C++11 以降の場合、(1) の形式を呼び出し、[`bad_alloc`](bad_alloc.md) 例外がスローされた場合には、ヌルポインタを返す。

	この差は、利用者が `operator new` を置き換えていない場合には顕在化しないが、利用者が (1) の形式のみを置き換えた場合、C++03 までは (2) の形式を呼び出しても置き換えられたバージョンは呼び出されない。  
	`new` 式と異なり、`delete` 式には配置構文が存在しないため、(2) の形式で確保した記憶域も通常の `delete` 式で開放することになる（コンストラクタで例外がスローされた場合を除く。[`operator delete`](op_delete.md)も参照）。  
	従って、C++03 までの場合、(1) の形式を利用者提供の関数で置き換える場合は、(2) の形式も (1) の形式と同様の記憶域確保を行う利用者提供の関数で置き換えるべきである。その場合、C++11 の (2) の形式のように、(1) を呼び出した上で例外ハンドリングする方法が安全確実な方法である。  
	なお、C++11 からは (2) の形式は (1) を呼び出すことになっているため、 (1) の形式のみを置き換えれば問題はないが、C++03 までのバージョンでも同様に動くようにするため、あるいは、標準ライブラリのバグで (2) の形式が (1) の形式を呼び出していない可能性もあるため、(2) の形式も提供した方が良いかもしれない。

- (3) の形式は、実質何もしていない。この形式は、記憶域を確保した上でそこに新たなオブジェクトを構築するのではなく、あらかじめ確保されている記憶域上に新たなオブジェクトを構築するのに用いられる。  
	一般に、プログラム実行中の記憶域の動的確保は、処理系が OS からヒープを確保するのに対し、(3) の形式では、既にプログラムに確保済みの任意の記憶域上にオブジェクトを構築するため、上手く使った場合には `new` / `delete` を大量に繰り返す必要のある処理を高速に実現しうる。

- `new` 式は `operator new` を呼び出すだけではない事に注意。  
	`new` 式は、`operator new` を呼び出した後、確保された記憶域上にオブジェクトを構築する（つまり、コンストラクタを呼び出す）。  
	特に、(2) の形式を使用するために `new` 式を `new(std::`[`nothrow`](nothrow_t.md)`)` のようにしても、依然としてコンストラクタが例外をスローする可能性はあるため、`new` 式が例外をスローしないとは限らない。


##例
```cpp
#include <iostream>
#include <new>
#include <complex>

int main()
{
  using cl = std::complex<long double>;

  try {
    // (1) cl 型変数を動的に作成
    // 確保失敗時に bad_alloc 例外が送出される
    cl* p1 = new cl();
    delete p1;

    // (2) cl 型変数を動的に作成
    // 確保失敗時にヌルポインタが返される
    cl* p2 = new (std::nothrow) cl();
    delete p2;	// 配置 delete と言うものはないので、通常の delete 式で記憶域を解放する

    // (3) char 配列のスタック領域に、cl 型変数を動的に作成
    // 領域のアラインメントに注意
    alignas(cl) char one_field[sizeof(cl)] = {};
    int* p3 = new(one_field) cl();
    p3->~cl();	// delete は使えないため、デストラクタを直接呼び出す
  }
  catch (std::bad_alloc& e) {
    std::cout << e.what() << std::endl;
    throw;
  }
}
```
* iostream[link ../iostream.md]
* new[link ../new.md]
* complex[link ../complex.md]
* nothrow[link nothrow_t.md]
* bad_alloc[link bad_alloc.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]

###出力
```
```
