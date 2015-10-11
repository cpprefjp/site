#pword
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
void*& pword(int idx);
```

##概要
`void*` 型の私用記憶域への参照を取得する。


##効果
`idx` で指定した記憶域がまだ確保されていなかった場合、新たに `void*` 型の記憶域を確保し、ヌルポインタで初期化する。
もし、記憶域の確保に失敗し、かつ、`*this` が [`basic_ios`](../basic_ios.md) の基底サブオブジェクトの場合、[`basic_ios`](../basic_ios.md)`::`[`setstate`](../basic_ios/setstate.md)`(badbit)` を呼び出す（これは [`failure`](failure.md) 例外を送出するかもしれない）。


##戻り値
`idx` で指定した記憶域への参照。もし記憶域が確保できなかった場合（かつ[`failure`](failure.md) 例外が投げられなかった場合）には、ヌルポインタに初期化された有効な `void*` 型への参照。


##備考
- 引数 `idx` には、[`xalloc`](xalloc.md) で取得した値を渡すことが想定されている。
    そうすることによって、各プログラムが他のプログラムと競合すること無く各ストリームオブジェクト内に `void*` 型の私用記憶域を確保することが可能となる。
- 本関数で取得した `void*` への参照は、本オブジェクトの他の操作によって無効になる可能性がある。  
    しかし、その場合でも引数 `idx` で指定した記憶域の内容は依然として有効である。
- 本関数で取得した `void*` 型の記憶域の内容は、[`basic_ios`](../basic_ios.md)`::`[`copyfmt`](../basic_ios/copyfmt.md) でコピーされる。  
    ただし、コピーされるのはあくまでもポインタ値であるため、必要に応じてコールバックで対処を行うこと。（下記の例も参照）


##例
```cpp
#include <iostream>
#include <string>
#include <sstream>

// 任意の接尾辞を付加出力可能な string 型
struct MyString {
  std::string value;
};

// 接尾辞を指定するためのマニピュレータ
struct setsuffix {
  explicit setsuffix(const std::string& suffix) : suffix(suffix) {}
  friend std::ostream& operator<<(std::ostream& os, const MyString& x);
  friend std::ostream& operator<<(std::ostream& os, const setsuffix& manip);
private:
  std::string suffix;
  static const int index;
  static void callback(std::ios_base::event ev, std::ios_base& str, int index) {
    void*& psuffix = str.pword(index);
    switch (ev) {
    case std::ios_base::erase_event:
      // デストラクタ、および、copyfmt のコピー前に string を delete
      delete static_cast<std::string*>(psuffix);
      break;
    case std::ios_base::copyfmt_event:
      // copyfmt のコピー後に string を複製
      psuffix = new std::string(*static_cast<std::string*>(psuffix));
      break;
    case std::ios_base::imbue_event:
      break;
    }
  }
};

// 記憶域用の添え字を取得
const int setsuffix::index = std::ios_base::xalloc();

// MyString 用の出力演算子
std::ostream& operator<<(std::ostream& os, const MyString& x)
{
  std::string* psuffix = static_cast<std::string*>(os.pword(setsuffix::index));
  return os << (psuffix == 0 ? x.value : x.value + *psuffix);
}

// マニピュレータ用の出力演算子
std::ostream& operator<<(std::ostream& os, const setsuffix& manip)
{
  void*& psuffix = os.pword(setsuffix::index);
  if (!os.bad()) {
    if (psuffix == 0) {
      // 初回はコールバックを登録して、string を割り当てる
      os.register_callback(setsuffix::callback, setsuffix::index);
      psuffix = new std::string(manip.suffix);
    } else {
      *static_cast<std::string*>(psuffix) = manip.suffix;
    }
  }
  return os;
}

int main()
{
  MyString x = {"今日も一日がんばる"};

  std::cout << x << std::endl;                          // 普通に出力
  std::cout << setsuffix("ドン") << x << std::endl;     // どんちゃん風に出力

  std::stringstream ss;
  ss << setsuffix("ぞい");                              // ss を涼風青葉風出力に設定
  std::cout.copyfmt(ss);                                // ss から std::cout にフォーマットをコピー
  ss << setsuffix("(´･_･`)");                           // ss を tanakh さん風に設定変更
  std::cout << x << std::endl;                          // 涼風青葉風に出力（ss に対する変更は無影響）
}
```
* xalloc[link xalloc.md]
* ostream[link ../../ostream/basic_ostream.md]
* iostream[link ../../iostream.md]
* sstream[link ../../sstream.md]
* string[link ../../string.md]
* pword[color ff0000]
* stringstream[link ../../sstream/basic_stringstream.md.nolink]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* ios_base[link ../ios_base.md]
* bad[link ../basic_ios/bad.md]
* event[link type-event.md]
* erase_event[link type-event.md]
* copyfmt_event[link type-event.md]
* imbue_event[link type-event.md]
* register_callback[link register_callback.md]

###出力
```
今日も一日がんばる
今日も一日がんばるドン
今日も一日がんばるぞい
```

なお、上記の例はコールバックで例外の適切な処置を行っていないので注意。  
（コールバックは例外を送出してはいけない。[`register_callback`](register_callback.md) の要件を参照）


##参照
- [`xalloc`](xalloc.md)
- [`iword`](iword.md)
- [`basic_ios`](../basic_ios.md)`::`[`copyfmt`](../basic_ios/copyfmt.md)
- [`register_callback`](register_callback.md)
- [`event_callback`](type-event_callback.md)
- [`event`](type-event.md)
