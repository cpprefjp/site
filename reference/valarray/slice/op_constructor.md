#コンストラクタ
* valarray[meta header]
* std[meta namespace]

```cpp
slice();
slice(size_t start, size_t length, size_t stride);
slice(const slice&);
```
* size_t[link /reference/cstddef/size_t.md]

##`slice`オブジェクトの構築

`slice`オブジェクトを次に示す通りの要素で初期化する。

- `slice();`
    - `slice(0, 0 ,0)`と等価。
- `slice(size_t start, size_t length, size_t stride);`
    - 初期位置`start`、要素数`length`、間隔`stride`でスライスする`slice`オブジェクトを構築する。
- `slice(const slice&);`
    - コピーコンストラクタ。コピー元の`slice`オブジェクトと同じ初期位置、要素数、間隔でスライスする`slice`オブジェクトを構築する。


##パラメータ
- `start`
    - スライスする初期位置。
- `length`
    - スライスする要素数。
- `stride`
    - スライスする間隔。

##例
```cpp
#include <valarray>
#include <iostream>

auto main()
  -> int
{

  std::slice s0;

  constexpr auto start  = 3;
  constexpr auto length = 5;
  constexpr auto stride = 7;
  
  std::slice s1( start, length, stride );
  
  std::slice s2( s1 );
  
  auto print = []( const std::slice& s )
    { std::cout << &s << ": " << s.start() << " " << s.size() << " " << s.stride() << "\n"; }
    ;
  
  print( s0 );
  print( s1 );
  print( s2 );
}
```

###出力
```
0x7fffe0c71c98: 0 0 0
0x7fffe0c71c70: 3 5 7
0x7fffe0c71c58: 3 5 7
```
