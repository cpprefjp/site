# exception
* exception[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class exception;
}
```

## 概要
`exception`クラスは、標準ライブラリが提供する全ての例外クラスの基底クラスである。

標準ライブラリによって送出される例外オブジェクトのクラスは全て、このクラスから派生する。したがって、標準の例外は全てこのクラスで捕捉できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [(constructor)](exception/op_constructor.md) | コンストラクタ | |
| [(destructor)](exception/op_destructor.md) | デストラクタ | |
| [`operator=`](exception/op_assign.md) | 代入演算子 | |
| [`what`](exception/what.md) | エラー理由を取得する | |


## 例
```cpp example
#include <iostream>
#include <exception>
#include <stdexcept> // std::runtime_error

int main()
{
  try {
    bool is_error = true;
    if (is_error) { // なんらかのエラーが発生した
      throw std::runtime_error("error!"); // 例外送出
    }
  }
  catch (std::exception& e) {
    // 例外を捕捉
    // エラー理由を出力する
    std::cout << e.what() << std::endl;
  }
}
```

### 出力
```
error!
```


## 参照

- [`<stdexcept>`](/reference/stdexcept.md)
