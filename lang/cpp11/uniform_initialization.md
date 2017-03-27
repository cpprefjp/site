# 一様初期化
* cpp11[meta cpp]

## 概要
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

これは、関数に引数を渡す場合も同様である。

また、丸カッコによる初期化は、状況によって意図せず関数宣言構文とみなされてしまうことがあるが、波カッコによる初期化を行うことで、意図通りに解釈される：

```cpp
struct X {};

int main()
{
  X x();  // x は引数を持たず X を返す関数の宣言！（おそらく意図と異なる）
  X y{};  // y はデフォルトコンストラクタで初期化した X 型の変数
}
```

```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  // コンパイルエラー！関数宣言構文とみなされるが、パラメータ名（std::cin）が名前空間修飾付きのため、エラー
//std::vector<char> vec(std::istream_iterator<char>(std::cin),
//                      std::istream_iterator<char>());

  // vec は引数 2 つのコンストラクタで初期化された std::vector<char> 型の変数
  std::vector<char> vec{std::istream_iterator<char>(std::cin),
                        std::istream_iterator<char>()};
}
```
* std::cin[link /reference/iostream/cin.md]
* std::istream_iterator[link /reference/iterator/istream_iterator.md]


## 仕様
- 波カッコによる初期化子リストを`auto`で受けた場合、そのオブジェクトは[`std::initializer_list`](/reference/initializer_list.md)型に推論される
- 関数テンプレートのパラメータとして波カッコの初期化子リストを渡して型推論させることはできない。波カッコの初期化子リストを受ける側で構築する型が確定しないためである

    ```cpp
    template <class T>
    void f(T) {}

    int main()
    {
      f({1, 'a'}); // コンパイルエラー！Tの型を推論できない
    }
    ```

- 関数のパラメータ型が確定している場合、波カッコによる初期化子リストを渡せる

    ```cpp
    struct X {
      X(int, char) {}
    };

    void f(X) {}

    int main()
    {
      f({1, 'a'}); // OK
    }
    ```

- 関数の戻り値型が確定している場合、波カッコによる初期化子リストを`return`文で返せる。確定していない場合は返せない

    ```cpp
    struct X {
      X(int, char) {}
    };

    int main()
    {
      auto f = []() -> X { return {3, 'a'}; }; // OK
    //auto g = []() { return {3, 'a'}; };      // コンパイルエラー！戻り値の型を推論できない
    }
    ```

- [`std::initializer_list`](/reference/initializer_list.md)型を受け取るコンストラクタとデフォルトコンストラクタがある場合、空の初期化子リストが渡された際にはデフォルトコンストラクタが呼び出される

    ```cpp
    #include <iostream>
    #include <initializer_list>

    struct X {
      X()
      {
        std::cout << "default constructor" << std::endl;
      }

      X(std::initializer_list<int>)
      {
        std::cout << "initializer-list constructor" << std::endl;
      }
    };

    int main()
    {
      X x = {}; // 「default constructor」が出力される
    }
    ```
    * <initializer_list>[link /reference/initializer_list.md]
    * std::initializer_list[link /reference/initializer_list.md]

- [`std::initializer_list`](/reference/initializer_list.md)型を受け取るコンストラクタと、その初期化子リストの要素型と同じ型のパラメータリストを受け取るコンストラクタでは、[`std::initializer_list`](/reference/initializer_list.md)型を受け取るコンストラクタが優先して呼び出される。そのような状況で非[`std::initializer_list`](/reference/initializer_list.md)のコンストラクタを呼び出す場合は、丸カッコでのコンストラクタ呼び出しが必要となる

    ```cpp
    struct X {
      X(std::initializer_list<double>) {
        std::cout << 1 << std::endl;
      }
      X(double d) {
        std::cout << 2 << std::endl;
      }
    };

    X x1 = {3.0}; // 「1」が出力される
    ```
    * std::initializer_list[link /reference/initializer_list.md]


### <a name="evaluation-order" href="#evaluation-order">評価順序</a>
- 波カッコによるコンストラクタ呼び出しで渡す引数は、先頭から順番に評価されることが保証される

    ```cpp
    #include <iostream>

    int f()
    {
      std::cout << 1 << std::endl;
      return 1;
    }

    int g()
    {
      std::cout << 2 << std::endl;
      return 2;
    }

    int h()
    {
      std::cout << 3 << std::endl;
      return 3;
    }

    struct X {
      X(int, int, int) {}
    };

    int main()
    {
      X x1 { f(), g(), h() }; // 1, 2, 3の順で出力される
      X x2(f(), g(), h());    // 1, 2, 3が順不同で出力される
    }
    ```


## 関連項目
- [C++11 初期化子リスト](initializer_lists.md)


## 参照
- [N2477 Uniform initialization design choices](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2477.pdf)
- [N2532 Uniform initialization design choices (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2532.pdf)
- [N2575 Initializer Lists - Alternative Mechanism and Rationale](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2575.pdf)
- [N2640 Initializer Lists - Alternative Mechanism and Rationale (v. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2640.pdf)
- [CWG Issue 1030. Evaluation order in initializer-lists used in aggregate initialization](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1030)

