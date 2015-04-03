#xalloc
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
static int xalloc();
```

##概要
私用記憶域を予約する。

この関数は、呼び出すたびに一意な整数値を返す。この関数は、IOマニピュレータ単位の設定状態を管理するために使用する。


##戻り値
- C++11まで

```cpp
static int index = 0;
return index++;
```

- C++14以降
    - スレッドセーフになった

```cpp
static std::atomic<int> index(0);
return index++;
```
* std::atomic[link /reference/atomic/atomic.md]


##例
```cpp
// 値を16進数で出力するIOマニピュレータを作成する
#include <iostream>
#include <string>
#include <sstream>

// 16進数マニピュレータ用の一意なIDを作成する
int hex_index()
{
  static int index = std::ios_base::xalloc();
  return index;
}

// 16進数マニピュレータ
std::ostream& hex_manip(std::ostream& os)
{
  // 16進数用のIDをキーとして、状態を設定する
  static bool state = false;
  state = true;
  os.pword(hex_index()) = &state;
  return os;
}

struct MyInt {
  int value = 0;
};

std::ostream& operator<<(std::ostream& os, const MyInt& x)
{
  // 16進数マニピュレータの状態を確認して、10進数と16進数どちらで出力するかを判定する
  void* state = os.pword(hex_index());
  if (!state || *static_cast<bool*>(state) == false) {
    os << x.value;
  }
  else {
    std::ostringstream ss;
    ss << std::hex << x.value;
    os << ss.str();
  }
  return os;
}

int main()
{
  MyInt x;
  x.value = 10;

  std::cout << x << std::endl;
  std::cout << hex_manip << x << std::endl;
}
```
* std::ios_base::xalloc()[color ff0000]
* std::ostream[link /reference/ostream/basic_ostream.md]
* pword[link ./pword.md.nolink]
* std::ostringstream[link /reference/sstream/basic_ostringstream.md.nolink]
* std::hex[link /reference/ios/hex.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
10
a
```


##参照
- [LWG Issue 2143. `ios_base::xalloc` should be thread-safe](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2143)
    - C++14から、この関数は複数スレッドから呼び出しても安全になった。

