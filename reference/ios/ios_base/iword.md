# iword
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
long& iword(int idx);
```

## 概要
`long` 型の私用記憶域への参照を取得する。


## 事前条件
- C++20 : `idx`は、[`xalloc`](xalloc.md)の呼び出しによって取得した値であること。この事前条件を満たさない値（たとえば `-1` ）を渡した場合の動作は未規定


## 効果
`idx` で指定した記憶域がまだ確保されていなかった場合、新たに `long` 型の記憶域を確保し、`0` で初期化する。
もし、記憶域の確保に失敗し、かつ、`*this` が [`basic_ios`](../basic_ios.md) の基底サブオブジェクトの場合、[`basic_ios`](../basic_ios.md)`::`[`setstate`](../basic_ios/setstate.md)`(badbit)` を呼び出す（これは [`failure`](failure.md) 例外を送出するかもしれない）。


## 戻り値
`idx` で指定した記憶域への参照。もし記憶域が確保できなかった場合（かつ[`failure`](failure.md) 例外が投げられなかった場合）には、`0` に初期化された有効な `long` 型への参照。


## 備考
- 引数 `idx` に [`xalloc`](xalloc.md) で取得した値を渡すことによって、各プログラムが他のプログラムと競合すること無く各ストリームオブジェクト内に `long` 型の私用記憶域を確保することが可能となる。
- 本関数で取得した `long` への参照は、本オブジェクトの他の操作によって無効になる可能性がある。  
    しかし、その場合でも引数 `idx` で指定した記憶域の内容は依然として有効である。
- 本関数で取得した `long` 型の記憶域の内容は、[`basic_ios`](../basic_ios.md)`::`[`copyfmt`](../basic_ios/copyfmt.md) でコピーされる。


## 例
```cpp example
#include <iostream>
#include <string>
#include <sstream>

// 任意の基数で出力可能な unsigned 型
struct MyUnsigned {
  unsigned value;
};

// 基数を指定するためのマニピュレータ
struct setradix {
  explicit setradix(int radix) : radix(radix) {}
  friend std::ostream& operator<<(std::ostream& os, const MyUnsigned& x);
  friend std::ostream& operator<<(std::ostream& os, const setradix& manip);
private:
  int radix;
  static const int index;
};

// 記憶域用の添え字を取得
const int setradix::index = std::ios_base::xalloc();

// MyUnsigned 用の出力演算子
std::ostream& operator<<(std::ostream& os, const MyUnsigned& x)
{
  long radix = os.iword(setradix::index);
  if (radix == 0) {
    radix = 10;
  }

  std::string s;
  unsigned n = x.value;
  do {
    s.insert(0, 1, '0' + n % radix);
    n /= radix;
  } while (n != 0);

  return os << s;
}

// マニピュレータ用の出力演算子
std::ostream& operator<<(std::ostream& os, const setradix& manip)
{
  long& radix = os.iword(setradix::index);
  if (!os.bad()) {
    radix = manip.radix;
  }
  return os;
}

int main()
{
  MyUnsigned x = {10};

  std::cout << x << std::endl;                      // 10 進数として普通に出力
  std::cout << setradix(7) << x << std::endl;       // 7 進数として出力

  std::stringstream ss;
  ss << setradix(3);                                // ss に基数 3 を設定
  std::cout.copyfmt(ss);                            // ss から std::cout にフォーマットをコピー
  std::cout << x << std::endl;                      // 3 進数として出力
}
```
* iword[color ff0000]
* xalloc[link xalloc.md]
* std::stringstream[link ../../sstream/basic_stringstream.md]
* std::ios_base[link ../ios_base.md]
* insert[link ../../string/basic_string/insert.md]
* bad()[link ../basic_ios/bad.md]
* copyfmt[link ../basic_ios/copyfmt.md]

### 出力
```
10
13
101
```


## 関連項目
- [`xalloc`](xalloc.md)
- [`pword`](pword.md)
- [`basic_ios`](../basic_ios.md)`::`[`copyfmt`](../basic_ios/copyfmt.md)

## 参照
- [LWG Issue 3083. What should `ios::iword(-1)` do?](https://cplusplus.github.io/LWG/issue3083)
    - C++20で、引数には[`xalloc`](xalloc.md)で取得した値を渡すことが事前条件として明確化された（それ以外の値を渡した場合の動作は未規定）
