#operator<<
```cpp
bitset<N> operator<<(size_t pos) const noexcept;
```

##概要
ビットを左シフトした`bitset`オブジェクトを生成する。


##戻り値
`*this`のビットを`pos`の個数だけ左にシフトさせた`bitset`オブジェクトを生成して返す。溢れたビットは0になる。  
この関数は、以下のプログラムと同じ動作をする：

```cpp
return bitset(*this) <<= pos;
```
* <<=[link ./op_left_shift_assign.md]


##例外
投げない。


##例
```cpp
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<8> bs("10000011");

  std::bitset<8> result = bs << 4;

  std::cout << result << std::endl;
}
```

###出力
```
00110000
```


##参照

