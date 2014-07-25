# コンストラクタ
```cpp
gslice();
gslice(size_t s, valarray<size_t> l, valarray<size_t> d);
gslice(const slice&);
```
* size_t[link /reference/cstddef/size_t.md]
* valarray[link /reference/valarray/valarray.md]

##`gslice`オブジェクトの構築

`gslice`オブジェクトを次に示す通りの要素で初期化する。

- `gslice();`
    - `gslice( 0, valarray<size_t>(), valarray<size_t>() )`と等価。
- `slice(size_t s, size_t l, size_t d);`
    - 初期位置`s`から要素数群`l`と間隔数群`d`でスライスする`gslice`オブジェクトを構築する。
        - `l`と`d`はインデックス`0`番目から準に読み出され、`d[0]`個おきに`l[0]`個を選び、そのそれぞれの位置からさらに`d[1]`個おきに`l[1]`個を選び…とスライスされる。
- `gslice(const gslice&);`
    - コピーコンストラクタ。コピー元の`gslice`オブジェクトと同じ初期位置、要素数群、間隔数群でスライスする`gslice`オブジェクトを構築する。


##パラメータ
- `s`
    - スライスする初期位置。
- `l`
    - スライスする要素数群。
- `d`
    - スライスする間隔数群。


##例
```cpp
#include <valarray>
#include <iostream>
#include <sstream>

auto main()
  -> int
{

  std::gslice gs0;

  constexpr auto             start   = 3;
  std::valarray<std::size_t> lengths = {  3, 4 };
  std::valarray<std::size_t> strides = { 10, 3 };
  
  std::gslice gs1( start, lengths, strides );
  
  std::gslice gs2( gs1 );
  
  auto to_string = []( const std::valarray<std::size_t> a )
    {
      std::stringstream r;
      for ( auto v : a )
        r << v << " ";
      return r.str();
    }
    ;
  
  auto print = [ &to_string ]( const std::gslice& gs )
    {
      std::cout
        << "[" << &gs << "]:" "\n"
           "start : " << gs.start()               << "\n"
           "size  : " << to_string( gs.size()   ) << "\n"
           "stride: " << to_string( gs.stride() ) << "\n"
        ;
    }
    ;
  
  print( gs0 );
  print( gs1 );
  print( gs2 );
}
```

###出力
```
[0x7fff4fe25758]:
start : 0
size  : 
stride: 
[0x7fff4fe256d8]:
start : 3
size  : 3 4 
stride: 10 3 
[0x7fff4fe256d0]:
start : 3
size  : 3 4 
stride: 10 3 
```
