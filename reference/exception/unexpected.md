#unexpected
```cpp
<pre> void unexpected();</pre>
```

##概要

<b>例外指定のある関数内で、指定外の例外が発生した時に呼び出される例外ハンドラを直接呼び出す。</b>

この関数を呼び出すと、例外ハンドラが呼ばれ、さらに終了ハンドラが呼び出され、アプリケーションは終了する。ハンドラ内で例外をthrowした場合は、unexpectedを呼び出した地点が、try-catch で処理されていればcatchすることが出来る。


<b>例外</b>



##計算量



##備考



##例

```cpp
#include <stdexcept>#include <iostream>void unexpected_handler(){    std::cout << "unexpected handler called" << std::endl;}int main(){    std::set_unexpected( unexpected_handler );    std::unexpected();    return 0;}
```

###出力

```cpp
unexpected handler called<例外キャッチを行っていないので、アプリ自体が終了する>
```

##バージョン


###言語



###処理系

(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```