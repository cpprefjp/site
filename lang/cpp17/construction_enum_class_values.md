# enum class変数の初期値として整数を指定する際の規則を調整
* cpp17[meta cpp]

## 概要
C++11にてスコープを持つ列挙型が導入された。これは基底型を明示することができ、従来の列挙型と異なり整数型への暗黙の型変換を行わない。

型変換を禁�する規則が厳格すぎて、初期化の際に不便が生じていたためC++17で規則が緩和された。

## 仕様
スコープを持つ列挙型に基底型が指定されていて、初期化リストが単一の要素`v`を持ち、かつリストによる直接の初期化であれば、初期化できる。

ただし基底型へ変換する際に、精度を失う変換が要求される場合はプ�グラムは不適格となる。


## 例
```cpp example
enum class byte : unsigned char { };

int main()
{
  // C++14
  byte aa { (byte)42 };
  byte ab = (byte)42;
  byte ac = static_cast<byte>(42);
  // C++17
  byte ba { 42 };         // OK in C++17, error in C++14
  byte bb = byte{ 42 };   // OK in C++17, error in C++14
  byte bc = { 42 };       // error, { 42 } is int

  // C++14
  byte ca { (byte)42 };
  byte cb { (byte)1142 }; // OK, but cannot detect narrowing
  // C++17
  byte da { 42 };         // OK in C++17, error in C++14
  byte db { 1142 };       // error, narrowing

  return 0;
}
```

### 出力
不適格。

### �告例
clang++ 6.0.0 C++14モードにてコンパイルした場合。

```
construction_enum_class.cpp:13:12: error: cannot initialize a variable of type
      'byte' with an rvalue of type 'int'
        byte ba { 42 };         // OK in C++17, error in C++14
                  ^~
construction_enum_class.cpp:14:18: error: cannot initialize a value of type
      'byte' with an rvalue of type 'int'
        byte bb = byte{ 42 };   // OK in C++17, error in C++14
                        ^~
construction_enum_class.cpp:15:14: error: cannot initialize a variable of type
      'byte' with an rvalue of type 'int'
        byte bc = { 42 };       // error, { 42 } is int
                    ^~
construction_enum_class.cpp:21:12: error: cannot initialize a variable of type
      'byte' with an rvalue of type 'int'
        byte da { 42 };         // OK in C++17, error in C++14
                  ^~
construction_enum_class.cpp:22:12: error: cannot initialize a variable of type
      'byte' with an rvalue of type 'int'
        byte db { 1142 };       // error, narrowing
                  ^~~~
5 errors generated.
```

clang++ 6.0.0 C++17モードにてコンパイルした場合。

```
construction_enum_class.cpp:15:14: error: cannot initialize a variable of type
      'byte' with an rvalue of type 'int'
        byte bc = { 42 };       // error, { 42 } is int
                    ^~
construction_enum_class.cpp:22:12: error: constant expression evaluates to 1142
      which cannot be narrowed to type 'byte' [-Wc++11-narrowing]
        byte db { 1142 };       // error, narrowing
                  ^~~~
2 errors generated.
```

## この機能が必要になった背景・経緯
ユーザ定義の整数を定義する際のテクニックとして例で挙げたように、要素を一つも持たないスコープを持つ列挙型を定義する方法がある。

```cpp
enum class byte : unsigned char { };
```

`unsigned char`型を直接使用すると整数への暗黙の型変換が行われ、しばしばバグの原因となるが、`byte`型を使えば整数への暗黙の型変換を防ぐことができる。それでいて`unsigned char`型を直接使用した場合と同様の効率良いコードを書くことができる利点がある（例えば`struct`のコピーや値渡しにペナルティが生じるようなアー�テクチャでも、効率良く扱うことができる）。

しかしこのテクニックの欠点は`byte`型を整数で初期化する際に�ャストが必要となってしまうことである。�ャストを行うとプ�グラムが見づらいうえに、精度が失われる変換を検出できなくなる問題があった（プ�グラマが本当に精度を失わせたいのか、間違った値を指定しただけなのか、コンパイラには判�できない）。

C++17ではスコープを持つ列挙型の初期化ルールを緩和し、簡潔な記述を実現するとともに、意図せず精度を失う変換を行う危険性を排除した。


## 関連項目
- [C++11 スコープを持つ列挙型](/lang/cpp11/scoped_enum.md)
- [`std::byte`](/reference/cstddef/byte.md)

## 参照
- [P0138R2 Construction Rules for enum class Values.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0138r2.pdf)
