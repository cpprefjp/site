#operator new[]
* new[meta header]
* function[meta id-type]

```cpp
// 単純な配列の記憶域の確保
void* operator new[](std::size_t size) throw(std::bad_alloc);					// (1) C++03 まで
void* operator new[](std::size_t size);											// (1) C++11 から

// 単純な配列の記憶域の確保（例外をスローしない）
void* operator new[](std::size_t size, const std::nothrow_t&) throw();			// (2) C++03 まで
void* operator new[](std::size_t size, const std::nothrow_t&) noexcept;			// (2) C++11 から

// 配置newによる配列の記憶域の確保
void* operator new[](std::size_t size, void* ptr) throw();						// (3) C++03 まで
void* operator new[](std::size_t size, void* ptr) noexcept;						// (3) C++11 から
```
* bad_alloc[link bad_alloc.md]
* nothrow_t[link nothrow_t.md]


##概要
配列オブジェクトのために動的に記憶域を確保する。


##効果
- (1) [`operator new`](op_new.md)`(size)` を呼び出す。
- (2) C++03 までと C++11 からで異なる。  
	- C++03 まで：[`operator new`](op_new.md)`(size, std::`[`nothrow`](nothrow_t.md)`)` を呼び出す。  
	- C++11 から：(1) の形式を `operator new[](size)` で呼び出す。ただし、記憶域の確保に失敗しても例外をスローしない。
- (3) 何もしない。


##戻り値
- (1) 確保した記憶域の先頭アドレスを指すポインタ（[`operator new`](op_new.md)`(size)` の戻り値）。
- (2) 記憶域を確保できた場合、確保した記憶域の先頭アドレスを指すポインタ。確保できなかった場合、ヌルポインタ。
	- C++03 まで：[`operator new`](op_new.md)`(size, std::`[`nothrow`](nothrow_t.md)`)` の戻り値
	- C++11 から：`operator new[](size)` の戻り値。ただし、`std::`[`bad_alloc`](bad_alloc.md) 例外がスローされた場合には、ヌルポインタ。
- (3) 引数 `ptr`


##備考
- (1)、および、(2) の形式は、`size` が `0` でも他の確保済みの記憶域と異なるアドレスを返す。  
	ただし、記憶域の確保に失敗する可能性もあり、また、成功しても当該ポインタを間接参照した場合の結果は未定義である。

- (1)、および、(2) の形式は、利用者がこれらとおなじシグネチャの関数を用意することで、標準ライブラリの提供している関数を置き換えることができる。  
	なお、(3) の形式については、置き換えることはできない（許可されていない）。

- (1) の形式の `operator new[]` を呼び出すだけであれば、（`new` 式から間接的に呼ばれる場合も含めて）`new` ヘッダをインクルードする必要はない。

- (2) の形式の挙動の C++03 までと C++11 からの差は、利用者が [`operator new`](op_new.md)、あるいは `operator new[]` を置き換えていない場合には顕在化しない。  
	しかし、例えば利用者が (1) の形式のみを置き換えた場合、C++03 までは (2) の形式を呼び出しても置き換えられたバージョンは呼び出されずに、間接的に[`operator new`](op_new.md) の (2) の形式を呼び出す。  
	`new` 式と異なり、`delete` 式には配置構文が存在しないため、(2) の形式で確保した記憶域も通常の `delete` 式で開放する事になる（コンストラクタで例外がスローされた場合を除く。[`operator delete[]`](op_delete[].md) も参照）。  
	従って、C++03 までの場合、(1) の形式を利用者提供の関数で置き換える場合は、(2) の形式も (1) の形式と同様の記憶域確保を行う利用者提供の関数で置き換えるべきである。その場合、C++11 の (2) の形式のように、(1) を呼び出した上で例外ハンドリングする方法が安全確実な方法である。  
	なお、C++11 からは (2) の形式は (1) を呼び出すことになっているため、 (1) の形式のみを置き換えれば問題はないが、C++03 までのバージョンでも同様に動くようにするため、あるいは、標準ライブラリのバグで (2) の形式が (1) の形式を呼び出していない可能性もあるため、(2) の形式も提供した方が良いかもしれない。

- (3) の形式は、実質何もしていない。この形式は、記憶域を確保した上でそこに新たなオブジェクトを構築するのではなく、あらかじめ確保されている記憶域上に新たなオブジェクトを構築するのに用いられる。  
	しかし、配列版 `new` 式では、指定した配列が必要とする記憶域のサイズをあらかじめ予測することが極めて困難であるため（下記を参照）、配列版 `new` 式の配置形式は使用すべきではない。  
	どうしても、あらかじめ確保されている記憶域上に配列を構築したい場合には、ループで単一オブジェクト版の配置 `new` を使用するなどして構築すること。

- 配列版 `new` 式は `operator new[]` を呼び出すだけではない事に注意。  
	配列版 `new` 式は、`operator new[]` を呼び出した後、確保された記憶域上にオブジェクトを構築する（つまり、コンストラクタを呼び出す）。  
	特に、(2) の形式を使用するために `new` 式を `new(std::`[`nothrow`](nothrow_t.md)`)` のようにしても、依然としてコンストラクタが例外をスローする可能性はあるため、`new` 式が例外をスローしないとは限らない。  
	また、配列版 `new` 式は、C++11 以降、配列の要素数の指定によっては `std::`[`bad_array_new_length`](bad_array_new_length.md) をスローする可能性もある。

- 引数 `size` は、配列版 `new` 式で指定されている配列の合計サイズより大きい可能性がある。  
	これは、配列版 `delete` 式を実行する際に、全要素に対してデストラクタを呼び出す等のために、配列要素そのもの以外の情報を格納することがあるためである。  
	なお、このオーバーヘッドのサイズは、実装によって異なるだけでなく、同一の実装でも場合によって異なる可能性があり、あらかじめこのサイズを知ることは極めて困難である。


##例
```cpp
#include <iostream>
#include <new>
#include <complex>

int main()
{
  using cl = std::complex<long double>;

  try {
    // (1) 3 要素の cl 型配列を動的に作成
    // 確保失敗時に bad_alloc 例外が送出される
    cl* p1 = new cl[3];
    delete[] p1;

    // (2) 3 要素の cl 型配列を動的に作成
    // 確保失敗時にヌルポインタが返される
    cl* p2 = new (std::nothrow) cl[3];
    delete[] p2;	// 配置 delete と言うものはないので、通常の delete 式で記憶域を解放する

    // (3) char 配列のスタック領域に、3 要素の cl 型配列を動的に作成
    // ただし、危険なため、使用してはいけない
    //alignas(cl[3]) char array_field[sizeof(cl) * 3] = {};
    //cl* p3 = new(array_field) cl[3];
    //for (std::size_t i = 3; i > 0; ) {	// ループでデストラクタを呼び出す
    //  --i;
    //  p3[i].~cl();
    //}

    // 参考 char 配列のスタック領域に、3 要素の cl 型配列を動的に作成
    // (3) の形式ではなく、ループでオブジェクトを構築
    alignas(cl[3]) char array_field[sizeof(cl) * 3] = {};
    cl* p3 = reinterpret_cast<cl*>(array_field);
    for (std::size_t i = 0; i < 3; ++i) {	// ループで配置 new を呼び出す
      new(p3 + i) cl();
    }
    for (std::size_t i = 3; i > 0; ) {	// ループでデストラクタを呼び出す
      --i;
      p3[i].~cl();
    }
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
