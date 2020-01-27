# コンストラクタ
* valarray[meta header]
* std[meta namespace]
* slice[meta class]
* function[meta id-type]

```cpp
slice();                   // (1)

slice(std::size_t start,
      std::size_t length,
      std::size_t stride); // (2)

slice(const slice&);       // (3)
```

## `slice`オブジェクトの構築

`slice`オブジェクトを次に示す通りの要素で初期化する。

- (1) :
    - C++03 : 未規定
    - C++11 : `slice(0, 0 ,0)`と�価
- (2) : 初期位置`start`、要素数`length`、間隔`stride`でスライスする`slice`オブジェクトを構築する。
- (3) : コピーコンストラクタ。コピー元の`slice`オブジェクトと同じ初期位置、要素数、間隔でスライスする`slice`オブジェクトを構築する。


## パラメータ
- `start`
    - スライスする初期位置。
- `length`
    - スライスする要素数。
- `stride`
    - スライスする間隔。

## 例
```cpp example
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
* s.start()[link start.md]
* s.size()[link size.md]
* s.stride()[link stride.md]

### 出力
```
0x7fffe0c71c98: 0 0 0
0x7fffe0c71c70: 3 5 7
0x7fffe0c71c58: 3 5 7
```


## 参照
- [LWG Issue 543. `valarray` `slice` default constructor](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#543)

