# コンストラクタ
* valarray[meta header]
* std[meta namespace]
* gslice[meta class]
* function[meta id-type]

```cpp
gslice();                              // (1)

gslice(std::size_t start,
       valarray<std::size_t> lengths,
       valarray<std::size_t> strides); // (2)

gslice(const slice&);                  // (3)
```
* valarray[link /reference/valarray/valarray.md]

## `gslice`オブジェクトの構築

`gslice`オブジェクトを次に示す通りの要素で初期化する。

- (1) :
    - C++03 : 未規定
    - C++11 : `gslice( 0, valarray<size_t>(), valarray<size_t>() )`と�価。
- (2) : 初期位置`start`から要素数群`lengths`と間隔数群`strides`でスライスする`gslice`オブジェクトを構築する。
    - `lengths`と`strides`はインデックス`0`番目から順に�み出され、`strides[0]`個おきに`lengths[0]`個を選び、そのそれぞれの位置からさらに`strides[1]`個おきに`lengths[1]`個を選び…とスライスされる。
- (3) : コピーコンストラクタ。コピー元の`gslice`オブジェクトと同じ初期位置、要素数群、間隔数群でスライスする`gslice`オブジェクトを構築する。


## パラメータ
- `start`
    - スライスする初期位置。
- `lengths`
    - スライスする要素数群。
- `strides`
    - スライスする間隔数群。


## 例
```cpp example
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
* std::valarray[link /reference/valarray/valarray.md]

### 出力
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


## 参照
- [LWG Issue 543. `valarray` `slice` default constructor](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#543)

