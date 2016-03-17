#一様初期化
* cpp11[meta cpp]

##概要
「一様初期化 (uniform initialization)」は、コンストラクタの呼び出しを、リスト初期化と合わせて波カッコ `{ }`で記述する構文である。

```cpp
struct X {
  X(int) {}
};

int main()
{
  // 従来のコンストラクタ呼び出し
  X x1(0);
  X x2 = 0;

  // 一様初期化構文によるコンストラクタ呼び出し
  X x3 {0};
  X x4 = {0};
}
```

この機能によって、まず戻り値の型が確定している文脈において、コンストラクタの引数を波カッコ内に列挙したものを`return`文で返せるようになる。その際、`return`文にはコンストラクタ呼び出しのために、戻り値の型を記述する必要はない：

```cpp
#include <string>

struct X {
  X(int, double, std::string) {}
};

X createX()
{
  return {1, 3.14, "hello"}; // OK
}
```
* std::string[link /reference/string/basic_string.md]

これは、関数に引数を渡す場合も同様である。

また、丸カッコによるコンストラクタ呼び出しは、状況によって関数宣言構文とあいまいになることがあったが、波カッコによるコンストラクタ呼び出しを行うことで、そのあいまいさが解決される：

```cpp
struct X {};

int main()
{
  // デフォルトコンストラクタの呼び出し
//X x();  // コンパイルエラー！関数宣言構文とあいまいになる
  X x {}; // OK
}
```

```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  // コンパイルエラー！関数宣言構文とあいまいになる
//std::vector<char> vec(std::istream_iterator<char>(std::cin),
//                      std::istream_iterator<char>());

  // OK
  std::vector<char> vec{std::istream_iterator<char>(std::cin),
                        std::istream_iterator<char>()};
}
```
* std::vector[link /reference/vector.md]
* std::cin[link /reference/iostream/cin.md]
* std::istream_iterator[link /reference/iterator/istream_iterator.md]


##関連項目
- [C++11 初期化子リスト](initializer_lists.md)


##参照
- [N2477 Uniform initialization design choices](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2477.pdf)
- [N2532 Uniform initialization design choices (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2532.pdf)
- [N2575 Initializer Lists - Alternative Mechanism and Rationale](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2575.pdf)
- [N2640 Initializer Lists - Alternative Mechanism and Rationale (v. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2640.pdf)

