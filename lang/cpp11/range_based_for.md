#範囲for文
* cpp11[meta cpp]

##概要
範囲for文（The range-based for statement）は配列やコンテナを簡潔に扱うためのfor文の別表現である。

範囲for文が便利な例として、コンテナの各要素を処理するループを挙げる。

C++03のfor文では以下のように書いていた：
```cpp
std::vector<int> vec;

for (std::vector<int> it = vec.begin(); it != vec.end(); ++it) {
  std::cout << *it << std::endl;
}
```
ループ内の処理と直接関係のない変数（イテレータやポインタ）が出現し、ループ条件も加わりfor文が長くなりがちである。

範囲for文を使うと以下のように書ける：
```cpp
std::vector<int> vec;

for (auto& e : vec) {
  std::cout << e << std::endl;
}
```


##仕様
範囲for文は配列または、`begin()`および`end()`で表される範囲内の全ての要素に対して、処理を実行する。

範囲for文は以下の構文を持つ：

```cpp
for ( for-range-declaration : for-range-initializer ) statement
```

for-range-declarationには変数宣言を書く。ここで宣言した変数に範囲内の要素が先頭から終端まで順番に代入される。

for-range-initializerにはfor文が処理すべき範囲を表す値を書く。
値の型が配列の場合、配列のサイズが分かるものでなければならない。値の型が配列以外（クラスなど）の場合、`begin()`と`end()`で範囲の先頭と終端が表せるものでなければならない。

語弊を恐れず言えば、メンバ関数に`begin()`および`end()`を持つクラスであれば、何でも範囲for文の範囲として指定できる。
従って標準コンテナのみならず、ユーザ定義のクラスに対しても範囲for文を適用可能である。

従来のfor文と異なりセミコロンではなくコロンで区切るので、記述の際は間違わないように注意。


範囲for文に配列以外の型を範囲として渡したとき、以下のように展開される：

```cpp
{
  auto && __range = range-init;

  for (auto __begin = begin(__range), __end = end(__range); __begin != __end; ++__begin) {
    for-range-declaration = *__begin;

    statement
  }
}
```

従って概要で挙げた例は以下のように展開される：

```cpp
for (auto& e : vec) {
  std::cout << e << std::endl;
}
```

```cpp
{
  auto && __range = vec;

  for (auto __begin = begin(__range), __end = end(__range); __begin != __end; ++__begin) {
    auto& e = *__begin;

    std::cout << e << std::endl;
  }
}
```

展開されたコード内の`begin()`と`end()`が正確に何を呼びだすかについては、引数依存の名前検索（argument-dependent name lookup; ADL）を参照のこと。


##例
```cpp
#include <iostream>
#include <vector>

class my_container {
public:
  int *begin() {
    return &buf[0];
  }
  int *end() {
    return &buf[5];
  }

private:
  int buf[5] = {21, 22, 23, 24, 25};
};

int main(int argc, char *argv[])
{
  //配列に対して範囲for文を使う
  int array[5] = {1, 2, 3, 4, 5};

  std::cout << "For int[5]: " << std::endl;
  for (auto& e : array) {
    std::cout << "  " << e << std::endl;
  }

  //標準コンテナに対して範囲for文を使う
  std::vector<int> vec = {10, 11, 12, 13};

  std::cout << "For std::vector<int>: " << std::endl;
  for (auto& e : vec) {
    std::cout << "  " << e << std::endl;
  }

  //ユーザ定義のクラスに対して範囲for文を使う
  my_container mc;

  std::cout << "For my_container: " << std::endl;
  for (auto& e : mc) {
    std::cout << "  " << e << std::endl;
  }

  return 0;
}
```

###出力
```
For int[5]:
  1
  2
  3
  4
  5
For std::vector<int>:
  10
  11
  12
  13
For my_container:
  21
  22
  23
  24
  25
```

##関連項目


##参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [N3337 Working Draft, Standard for Programming Language C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3337.pdf)

